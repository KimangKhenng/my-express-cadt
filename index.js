// Utiltiy
const express = require('express')
require('dotenv').config()
const app = express()
const https = require("https");
const fs = require('fs')
const parser = require('body-parser')

//Certificates
const key = fs.readFileSync("localhost-key.pem", "utf-8");
const cert = fs.readFileSync("localhost.pem", "utf-8");

//DB Connect
const dbConnect = require('./db/db.js')
dbConnect().catch((err) => { console.log(err) })

// Middlewares
const { errorHandle, logger, verifyToken } = require('./middlewares/index.js');

// Router
const userRoute = require('./routes/user.js')
const bookRouter = require('./routes/book.js')
const tweetRouter = require('./routes/tweet.js');
const authRouter = require('./routes/auth.js');

// Passport
const passport = require('passport');
const jwtStrategy = require('./common/strategies/jwt-strategy.js');
passport.use(jwtStrategy)

app.use(parser.json())
app.use(logger)
app.use('/auth', authRouter)
app.use('/users',
    passport.authenticate('jwt', { session: false }),
    userRoute)
app.use('/books',
    passport.authenticate('jwt', { session: false }),
    bookRouter)
app.use('/tweets',
    passport.authenticate('jwt', { session: false }),
    tweetRouter)
app.use(errorHandle)

const server = https.createServer({ key, cert }, app);

server.listen(4000, () => {
    console.log('Listening on port 4000!')
});