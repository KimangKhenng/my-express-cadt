const { checkSchema } = require('express-validator');

const loginSchema = checkSchema({
    email: {
        isEmail: true,
        errorMessage: 'Invalid email address',
    },
    password: {
        isLength: {
            options: {
                min: 5
            },
            errorMessage: 'Password must be at least 5 letters'
        },
    },
})

module.exports = { loginSchema }