const { books } = require('../db/db.js')
const Book = require('../models/book.js')
const asyncHandler = require("express-async-handler")

const redis = require('redis')
const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:6379`
})

client.on('error', (err) => {
    console.error('Redis error:', err)
}).on('connect', () => console.log('Conneted to Redis server!')).connect()

const getBook = asyncHandler(async (req, res) => {
    const bookId = req.params.id
    const book = await Book.findById(id)
    res.json(book)
})

const getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find()
    const { baseUrl } = req
    const data = await client.get(baseUrl)
    if (data == null) {
        // Save to cache server
        client.set(baseUrl, JSON.stringify(books), {
            EX: 60
        })
    }
    return res.json({ books })
})

const createBook = (req, res) => {
    const { title, author, page } = req.body
    const book = {
        id: Math.floor(Math.random() * 100),
        title,
        author,
        page
    }
    books.push(book)
    return res.json(book)
}

const getGenreCount = asyncHandler(async (req, res) => {
    const reuslt = await Book.aggregate().group({ _id: "$genre", count: { $sum: 1 } })
    return res.json(reuslt)
})
// ES5 module.exports, require, babel
// ES6 export default, import
module.exports = { getBook, getBooks, createBook, getGenreCount }