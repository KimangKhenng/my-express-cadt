const express = require('express')
const { getUser, getUsers } = require('../controllers/users')
const { idValidator } = require('../middlewares')
const router = express.Router()

router.get('/:id', idValidator, getUser)

router.get('/', getUsers)

module.exports = router