const express = require('express')
const {
    getUser,
    getUsers,
    deleteUserById,
    createUser,
    getTweetsByUserId,
    getBooksbyUserId,
    updateUserById
} = require('../controllers/users')
const { createUserSchema, updateUserSchema } = require('../common/validation')
const { handleValidation } = require('../middlewares')
const userRouter = express.Router()

userRouter.get('/:id', getUser)
userRouter.get('/', getUsers)
userRouter.delete('/:id', deleteUserById)
userRouter.post('/', createUser)
userRouter.get('/:id/tweets', getTweetsByUserId)
userRouter.get('/:id/books', getBooksbyUserId)
userRouter.put('/:id',
    updateUserSchema,
    handleValidation,
    updateUserById
)

module.exports = userRouter