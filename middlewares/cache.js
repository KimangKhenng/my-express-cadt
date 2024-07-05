const redis = require('redis')
const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:6379`
})
const asyncHandler = require('express-async-handler')

client.on('error', (err) => {
    console.error('Redis error:', err)
}).on('connect', () => console.log('Conneted to Redis server!')).connect()

const cacheMiddleware = asyncHandler(async (req, res, next) => {
    const { originalUrl } = req
    const data = await client.get(originalUrl)
    if (data !== null) {
        res.json(JSON.parse(data))
    } else {
        next()
    }
})
module.exports = { cacheMiddleware }