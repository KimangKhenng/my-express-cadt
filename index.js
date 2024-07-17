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


// Compression
const compression = require('compression')

// Morgan
const morgan = require('morgan')

// Helmet security
const helmet = require('helmet')
const { setupSwagger } = require('./swagger/index.js')
const path = require('path')

setupSwagger(app)
app.use(express.static(path.join(__dirname, 'frontend/dist')))
// Rate Limit
app.use(limiter)
app.use(helmet())
app.use(morgan('combined'))
app.use(compression())
app.use(parser.json())
// app.use(logger)
app.use('/api/auth', authRouter)
app.use(cacheInterceptor(60))
app.use(cacheMiddleware)
app.use('/api/v1/users',
    passport.authenticate('jwt', { session: false }),
    userRoute)
app.use('/api/v1/books',
    passport.authenticate('jwt', { session: false }),
    bookRouter)
// app.use('/books', bookRouter)
app.use('/api/v1/tweets',
    passport.authenticate('jwt', { session: false }),
    tweetRouter)

app.use('/api/v1/files', fileRouter)
// app.get('/files/:id', async (req, res) => {
//     const id = req.params.id
//     const file = await File.findById(id)
//     console.log(file.path)
//     return res.sendFile(file.path)
// })
app.use(errorHandle)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist'))
})
// const server = https.createServer({ key, cert }, app)

// server.listen(4000, () => {
//     console.log('Listening on port 4000!')
// })

app.listen(4000, () => {
    console.log('Listening on port 4000!')
})