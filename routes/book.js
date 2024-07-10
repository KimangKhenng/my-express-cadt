const express = require('express');
const { getBook, getBooks, createBook, getGenreCount } = require('../controllers/books');
const { authroize } = require('../middlewares');
/**
 * @swagger
 * tags:
 *  name: Books
 *  description: Book API
 */
const bookRouter = express.Router();

bookRouter.get('/genre', getGenreCount);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     tags: [Books]
 *     description: Get book by ID
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Get a book by ID
 */
bookRouter.get('/:id', getBook);

/**
 * @swagger
 * /books:
 *   get:
 *     tags: [Books]
 *     description: Get all books
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all books
 */
bookRouter.get('/', getBooks);

/**
 * @swagger
 * /books:
 *   post:
 *     tags: [Books]
 *     description: Create a book
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             type: object
 *             properties:
 *               title:
 *                  type: string
 *               description:
 *                  type: string
 *               page:
 *                  type: number
 *     responses:
 *       200:
 *         description: Return a created book
 */
bookRouter.post('/', authroize('create_record'), createBook);

module.exports = bookRouter;
