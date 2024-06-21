const express = require('express')
const { loginUser, signupUser } = require('../controllers/auth')
const authRouter = express.Router()

authRouter.post('/login', loginUser)
authRouter.post('/sign-up', signupUser)

module.exports = authRouter