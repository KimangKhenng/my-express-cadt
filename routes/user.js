const express = require('express')
const { getUser, getUsers, deleteUserById, createUser, getTweetsByUserId, getBooksbyUserId } = require('../controllers/users')
const { createUserSchema } = require('../common/validation')
const userRouter = express.Router()

userRouter.get('/:id', getUser)
userRouter.get('/', getUsers)
userRouter.delete('/:id', deleteUserById)
userRouter.post('/', createUserSchema, createUser)
userRouter.get('/:id/tweets', getTweetsByUserId)
userRouter.get('/:id/books', getBooksbyUserId)

module.exports = userRouter