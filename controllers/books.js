const { books } = require('../db/db.js')
const Book = require('../models/book.js')
const asyncHandler = require("express-async-handler")

const getBook = asyncHandler(async (req, res) => {
    const bookId = req.params.id
    const book = await Book.findById(id)
    res.json(book)
})

const getBooks = async (req, res) => {
    const books = await Book.find()
    return res.json({ books })
}

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
// ES5 module.exports, require, babel
// ES6 export default, import
module.exports = { getBook, getBooks, createBook }