const express = require('express')
const { loginUser, signupUser } = require('../controllers/auth')
const { handleValidation } = require('../middlewares')
const { loginSchema } = require('../common/validation')
const authRouter = express.Router()

authRouter.post('/login', loginSchema, handleValidation, loginUser)
authRouter.post('/sign-up', signupUser)

module.exports = authRouter