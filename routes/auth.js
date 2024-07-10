const express = require('express')
const { loginUser, signupUser, showGoogleOAuthScreen, handleGoogleLogin } = require('../controllers/auth')
const { handleValidation, loginLimit } = require('../middlewares')
const { loginSchema, createUserSchema } = require('../common/validation')
/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth Route
 */
const authRouter = express.Router()

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     description: User login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *                  example: Erna_Kuhic@yahoo.com
 *               password:
 *                  type: string
 *                  example: 12345678
 *     responses:
 *       200:
 *         description: Return a created book
 */
authRouter.post('/login', loginLimit, loginSchema, handleValidation, loginUser)
authRouter.post('/sign-up', createUserSchema, handleValidation, signupUser)
authRouter.get('/show-google-oauth', showGoogleOAuthScreen)
authRouter.get('/google-callback', handleGoogleLogin)

module.exports = authRouter