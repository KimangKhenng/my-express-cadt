const express = require('express')
const { getBook, getBooks, createBook } = require('../controllers/books')
const { idValidator } = require('../middlewares')
const bookRouter = express.Router()

bookRouter.get('/:id', idValidator, getBook)

bookRouter.get('/', getBooks)

bookRouter.post('/', createBook)

module.exports = bookRouter
