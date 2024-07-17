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
    const id = req.params.id
    const book = await Book.findById(id)
    return res.json(book)
})

const getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find().sort({ 'createdDate': 'desc' })
    const { originalUrl } = req
    return res.json(books)
})

const createBook = asyncHandler(async (req, res) => {
    console.log(req.body)
    const book = new Book(req.body)
    console.log(book)
    const reuslt = await book.save()
    // Invalidate Cache
    const { baseUrl } = req
    await client.del(baseUrl)
    return res.json(reuslt)
})

const getGenreCount = asyncHandler(async (req, res) => {
    const reuslt = await Book.aggregate().group({ _id: "$genre", count: { $sum: 1 } })
    return res.json(reuslt)
})
// ES5 module.exports, require, babel
// ES6 export default, import
module.exports = { getBook, getBooks, createBook, getGenreCount }