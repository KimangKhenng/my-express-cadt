const jwt = require("jsonwebtoken")
const { validationResult } = require('express-validator');
const { getPermissionsByRoleName } = require("../roles/role");
const Tweet = require("../models/tweet");
const Book = require("../models/book");
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Call the next middleware function
};

// Rate Limit
const { rateLimit } = require('express-rate-limit')
const { RedisStore } = require('rate-limit-redis')
const redis = require('redis')
const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:6379`
})
client.on('error', (err) => {
    console.error('Redis error:', err)
}).on('connect', () => console.log('Conneted to Redis server!')).connect()
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    limit: (req, res) => {
        if (validateToken(req)) {
            // 30 requests per minute for logged in user
            return 300
        } else {
            // 10 requests per minute for normal user
            return 100
        }
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    store: new RedisStore({
        sendCommand: (...args) => client.sendCommand(args),
    }),
})

const loginLimit = rateLimit(
    {
        windowMs: 60 * 60 * 1000, // 60 minute
        limit: 5,
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers}
    }
)

const errorHandle = (err, req, res, next) => {
    // console.error("Error server: ", err.stack)
    return res.status(500).json({ message: err.message })
}

const handleValidation = (req, res, next) => {
    const result = validationResult(req)
    if (result.isEmpty()) {
        next()
    } else {
        return res.status(401).json({ error: result.array() })
    }
}

const idValidator = (req, res, next) => {
    const id = req.params.id
    if (!isNaN(id)) {
        next()
    }
    throw Error(`Id: ${id} contains string`)
}

const verifyToken = (req, res, next) => {
    // Extract token from request header from clinet
    let token = req.header("Authorization")
    console.log(token)
    if (!token) {
        return res.status(401).json({ error: "Access denied!" })
    }
    token = token.replace("Bearer ", "")
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
}

const validateToken = (req) => {
    // Extract token from request header from clinet
    let token = req.header("Authorization")
    if (!token) {
        return false
    }
    token = token.replace("Bearer ", "")
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded) {
        return true
    } else {
        return false
    }
}

const authroize = (permission) => {
    return (req, res, next) => {
        const user = req.user
        if (!user) {
            return res.status(401).json({ error: "Access denied!" })
        }
        const permissions = getPermissionsByRoleName(user.role)
        if (permissions.includes(permission)) {
            req.permission = permission
            next()
        } else {
            return res.status(403).json({ error: "Forbidden" })
        }
    }
}

const resourceControl = (resource) => {
    return async (req, res, next) => {
        const deletedId = req.params.id
        const userId = req.user.id
        // const permission = req.locals.permission
        if (req.user.role == 'admin') {
            next()
        }
        if (req.permission == 'delete_own_record' || req.permission == 'update_own_record') {
            if (resource == 'tweets') {
                const tweet = await Tweet.findOne({ _id: deletedId, byUser: userId })
                if (tweet) {
                    next()
                } else {
                    return res.status(403).json({ error: "Forbidden" })
                }
            }
            if (resource == 'books') {
                //Different logics
            }
        }
    }
}

module.exports = {
    logger,
    idValidator,
    errorHandle,
    verifyToken,
    handleValidation,
    authroize,
    resourceControl,
    validateToken,
    loginLimit,
    limiter
}