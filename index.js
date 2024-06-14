const express = require('express')
const app = express()
const https = require("https");
const fs = require('fs')

const key = fs.readFileSync("localhost-key.pem", "utf-8");
const cert = fs.readFileSync("localhost.pem", "utf-8");

const userRoute = require('./routes/user.js')
const bookRouter = require('./routes/book.js')

const { errorHandle, logger } = require('./middlewares/index.js')
app.use(logger)
app.use('/users', userRoute)
app.use('/books', bookRouter)
app.use(errorHandle)

server = https.createServer({ key, cert }, app);

server.listen(4000, () => {
    console.log('Listening on port 4000!')
});