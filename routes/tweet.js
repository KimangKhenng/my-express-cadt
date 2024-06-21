const express = require('express')
const { createTweet, getTweetByID } = require('../controllers/tweet')
const tweetRouter = express.Router()

tweetRouter.post('/', createTweet)
tweetRouter.get('/:id', getTweetByID)

module.exports = tweetRouter