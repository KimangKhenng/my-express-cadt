// Utiltiy
const express = require('express')
require('dotenv').config()
const app = express()
const https = require("https")
const fs = require('fs')
const parser = require('body-parser')

//Certificate
const key = fs.readFileSync("localhost-key.pem", "utf-8")
const cert = fs.readFileSync("localhost.pem", "utf-8")

//DB Connect
const dbConnect = require('./db/db.js')
dbConnect().catch((err) => { console.log(err) })

// Middlewares
const { errorHandle, logger, verifyToken, validateToken, limiter } = require('./middlewares/index.js')

// Router
const userRoute = require('./routes/user.js')
const bookRouter = require('./routes/book.js')
const tweetRouter = require('./routes/tweet.js')
const authRouter = require('./routes/auth.js')

// Passport
const passport = require('passport')
const jwtStrategy = require('./common/strategies/jwt-strategy.js')
const { upload } = require('./middlewares/upload.js')
const File = require('./models/file.js')
const fileRouter = require('./routes/file.js')
const { cacheInterceptor } = require('./interceptors/index.js')
const { cacheMiddleware } = require('./middlewares/cache.js')
passport.use(jwtStrategy)

// Rate Limit
app.use(limiter)

app.use(parser.json())
app.use(logger)
app.use('/auth', authRouter)
app.use(cacheInterceptor(60))
app.use(cacheMiddleware)
app.use('/users',
    passport.authenticate('jwt', { session: false }),
    userRoute)
app.use('/books',
    bookRouter)
app.use('/tweets',
    passport.authenticate('jwt', { session: false }),
    tweetRouter)

app.use('/files', fileRouter)
// app.get('/files/:id', async (req, res) => {
//     const id = req.params.id
//     const file = await File.findById(id)
//     console.log(file.path)
//     return res.sendFile(file.path)
// })
app.use(errorHandle)



// const server = https.createServer({ key, cert }, app)

// server.listen(4000, () => {
//     console.log('Listening on port 4000!')
// })

app.listen(4000, () => {
    console.log('Listening on port 4000!')
})