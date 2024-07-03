const express = require('express')
const { createTweet, getTweetByID, deleteTweetById, getTweets } = require('../controllers/tweet')
const { authroize, resourceControl } = require('../middlewares')
const tweetRouter = express.Router()

tweetRouter.post('/', authroize('create_record'), createTweet)
tweetRouter.get('/:id', authroize('read_record'), getTweetByID)
tweetRouter.get('/', authroize('read_record'), getTweets  )
tweetRouter.delete('/:id', authroize('delete_own_record'), resourceControl('tweets'), deleteTweetById)

module.exports = tweetRouter