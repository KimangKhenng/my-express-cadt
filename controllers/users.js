const Book = require('../models/book')
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
    // All user with age greater than 20
    // $gt = greater than
    const users = await User.find({ age: { $gt: 20 } })
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
    // 1st Way
    const tweets = await Tweet.find({
        byUser: id
    })
    // 2nd way
    // const tweets = await User.findById(id)
    //     .select('tweets')
    //     .populate('tweets')

    return res.json({ tweets })
})

const getBooksbyUserId = asyncHandler(async (req, res) => {
    const id = req.params.id
    const books = await Book.find({
        authors: {
            $elemMatch: {
                $eq: id
            }
        }
    })
    return res.json({ books })
})
module.exports = { getUser, getUsers, deleteUserById, createUser, getTweetsByUserId, getBooksbyUserId }