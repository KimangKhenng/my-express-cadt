const express = require('express')
const { getUser, getUsers,deleteUserById, createUser } = require('../controllers/users')
const router = express.Router()

router.get('/:id', getUser)

router.get('/', getUsers)

router.delete('/:id', deleteUserById)

router.post('/', createUser)

module.exports = router