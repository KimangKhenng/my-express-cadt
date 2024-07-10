const express = require('express')
const { getBook, getBooks, createBook, getGenreCount } = require('../controllers/books')
const { authroize } = require('../middlewares')
const bookRouter = express.Router()

bookRouter.get('/genre', getGenreCount)
bookRouter.get('/:id', getBook)
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books:
 *   get:
 *     tags: [Books]
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Returns all books
 */
bookRouter.get('/', getBooks)
// bookRouter.post('/', createBook)
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books:
 *   post:
 *     tags: [Books]
 *     description: Create a book
 *     responses:
 *       200:
 *         description: Return a created book
 */
bookRouter.post('/', authroize('create_record'), createBook)

module.exports = bookRouter
