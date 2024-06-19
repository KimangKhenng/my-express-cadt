const express = require('express')
const { getUser, getUsers,deleteUserById } = require('../controllers/users')
const { idValidator } = require('../middlewares')
const router = express.Router()

router.get('/:id', idValidator, getUser)

router.get('/', getUsers)

router.delete('/:id', deleteUserById)

module.exports = router