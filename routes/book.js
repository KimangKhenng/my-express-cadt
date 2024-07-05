const express = require('express')
const { getBook, getBooks, createBook, getGenreCount } = require('../controllers/books')
const { authroize } = require('../middlewares')
const { cacheMiddleware } = require('../middlewares/cache')
const bookRouter = express.Router()

bookRouter.get('/genre', getGenreCount)
bookRouter.get('/:id', getBook)
bookRouter.get('/', cacheMiddleware, getBooks)
bookRouter.post('/', authroize('create_record'), createBook)

module.exports = bookRouter
