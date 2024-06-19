const express = require('express')
const { getUser, getUsers,deleteUserById, createUser } = require('../controllers/users')
const { idValidator } = require('../middlewares')
const router = express.Router()

router.get('/:id', idValidator, getUser)

router.get('/', getUsers)

router.delete('/:id', deleteUserById)

router.post('/', createUser)

module.exports = router