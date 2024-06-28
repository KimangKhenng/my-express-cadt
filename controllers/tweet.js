const Tweet = require("../models/tweet")
const User = require("../models/user")
const asyncHandler = require('express-async-handler')

const createTweet = asyncHandler(async (req, res) => {
    const { text, byUser } = req.body
    const tweet = new Tweet({
        text: text,
        byUser: byUser
    })
    const result = await tweet.save()
    const user = await User.findById(byUser)
    user.tweets.push(result._id)
    await user.save()
    return res.json(result)
})

const getTweetByID = asyncHandler(async (req, res) => {
    const id = req.params.id
    const tweet = await Tweet.findById(id)
    return res.json({ tweet })
})

const getTweets = asyncHandler(async (req, res) => {
    const tweet = await Tweet.find()
    return res.json({ tweet })
})

const deleteTweetById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await Tweet.deleteOne({ _id: id })
    return res.json(result)
})
module.exports = {
    createTweet,
    getTweetByID,
    deleteTweetById,
    getTweets
}