const interceptor = require('express-interceptor')
const redis = require('redis')
const { responseHandler } = require("express-intercept")
const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:6379`
})
client.on('error', (err) => {
    console.error('Redis error:', err)
}).on('connect', () => console.log('Conneted to Redis server!')).connect()

const cacheInterceptor = (ttl) => responseHandler()
    .for(req => {
        return req.method == "GET"
    }).if(res => {
        const code = [200, 201, 203, 204]
        return code.includes(res.statusCode)
    }).getString(async (body, req, res) => {
        const { originalUrl } = res.req
        await client.set(originalUrl, body, {
            EX: ttl
        })
    })

module.exports = { cacheInterceptor }