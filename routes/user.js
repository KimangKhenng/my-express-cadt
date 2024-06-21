const express = require('express')
const { getUser, getUsers, deleteUserById, createUser, getTweetsByUserId } = require('../controllers/users')
const userRouter = express.Router()

userRouter.get('/:id', getUser)
userRouter.get('/', getUsers)
userRouter.delete('/:id', deleteUserById)
userRouter.post('/', createUser)
userRouter.get('/:id/tweets', getTweetsByUserId)

module.exports = userRouter