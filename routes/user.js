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
const { handleValidation, authroize } = require('../middlewares')
const userRouter = express.Router()

userRouter.get('/:id', authroize('read_record'), getUser)
userRouter.get('/', authroize('read_record'), getUsers)
userRouter.delete('/:id', authroize('delete_record'), deleteUserById)
userRouter.post('/', authroize('create_record'), createUser)
userRouter.get('/:id/tweets', authroize('read_record'), getTweetsByUserId)
userRouter.get('/:id/books', authroize('read_record'), getBooksbyUserId)
userRouter.put('/:id',
    authroize('update_record'),
    updateUserSchema,
    handleValidation,
    updateUserById
)

module.exports = userRouter