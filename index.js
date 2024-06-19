const express = require('express')
const app = express()
const https = require("https");
const fs = require('fs')
const parser = require('body-parser')

const key = fs.readFileSync("localhost-key.pem", "utf-8");
const cert = fs.readFileSync("localhost.pem", "utf-8");

const userRoute = require('./routes/user.js')
const bookRouter = require('./routes/book.js')

//DB Connect
const dbConnect = require('./db/db.js')

const { errorHandle, logger } = require('./middlewares/index.js');
const tweetRouter = require('./routes/tweet.js');

dbConnect().catch((err)=> {console.log(err)})

app.use(parser.json())
app.use(logger)
app.use('/users', userRoute)
app.use('/books', bookRouter)
app.use('/tweets', tweetRouter)
app.use(errorHandle)

const server = https.createServer({ key, cert }, app);

server.listen(4000, () => {
    console.log('Listening on port 4000!')
});