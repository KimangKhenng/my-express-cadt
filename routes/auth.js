const express = require('express')
const { loginUser, signupUser } = require('../controllers/auth')
const { handleValidation } = require('../middlewares')
const { loginSchema, createUserSchema } = require('../common/validation')
const authRouter = express.Router()

authRouter.post('/login', loginSchema, handleValidation, loginUser)
authRouter.post('/sign-up', createUserSchema, handleValidation, signupUser)

module.exports = authRouter