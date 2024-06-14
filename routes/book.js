const express = require('express')
const { getBook, getBooks } = require('../controllers/books')
const { idValidator } = require('../middlewares')
const bookRouter = express.Router()

bookRouter.get('/:id', idValidator, getBook)

bookRouter.get('/books', getBooks)

module.exports = bookRouter
