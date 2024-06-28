const express = require('express')
const { getBook, getBooks, createBook } = require('../controllers/books')
const { authroize } = require('../middlewares')
const bookRouter = express.Router()

bookRouter.get('/:id', authroize('read_record'), getBook)
bookRouter.get('/', authroize('read_record'), getBooks)
bookRouter.post('/', authroize('create_record'), createBook)

module.exports = bookRouter
