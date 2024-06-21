const Tweet = require('../models/tweet')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const getUser = asyncHandler(async (req, res) => {
    // If string in userId
    const userId = req.params.id
    const user = await User.findById(userId)
    return res.json(user)
})
const getUsers = asyncHandler(async (req, res) => {
    // Get all by using find method
    const users = await User.find().populate('tweets')
    return res.json(users)
})
const deleteUserById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const reuslt = await User.deleteOne({ _id: id })
    return res.json(reuslt)
})
const createUser = asyncHandler(async (req, res, next) => {
    const { name, age, email } = req.body
    const user = new User({
        name: name,
        age: age,
        email: email
    })
    const result = await user.save()
    return res.json(result)
})

const getTweetsByUserId = asyncHandler(async (req, res) => {
    const id = req.params.id
    const tweets = await Tweet.find({
        byUser: id
    })
    return res.json({ tweets })
})
module.exports = { getUser, getUsers, deleteUserById, createUser, getTweetsByUserId }