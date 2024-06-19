const express = require('express')
const { createTweet } = require('../controllers/tweet')
const tweetRouter = express.Router()

tweetRouter.post('/', createTweet)

module.exports = tweetRouter