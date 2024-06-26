const { checkSchema } = require('express-validator');
const User = require('../../models/user');

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

const createUserSchema = checkSchema({
    // No number allowed, Only small and capital, only English
    name: {
        isAlpha: {
            locale: 'en-US'
        },
        errorMessage: "Name must be alphabet only"
    },
    // Username(letter, number, alphanumeric)
    username: {
        isAlphanumeric: {
            locale: 'en-US'
        },
        isLength: {
            options: {
                max: 15,
                min: 6
            }
        }
    },
    // must be int, min 1 max 150
    age: {
        isInt: {
            options: { min: 1, max: 150 },
            errorMessage: 'Age must be between 1 and 150',
        },
    },
    // must be email
    email: {
        isEmail: true,
        // Check if email already registered
        custom: {
            options: async (value) => {
                const user = await User.findOne({ email: value })
                if (user) {
                    throw new Error(`User with email: ${value} already existed`)
                }
            }
        }
    },
    // Must be URL
    facebookURL: {
        isURL: true
    },
    // At least 8 letters, Capital, smallcase, Number
    password: {
        isAlphanumeric: {
            locale: 'en-US'
        },
        isLength: {
            options: {
                min: 8
            }
        }
    },
    confirmedPassword: {
        custom: {
            options: async (value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("Password mismatched!")
                }
            }
        }
    }
})

module.exports = { loginSchema, createUserSchema }