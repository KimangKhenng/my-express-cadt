const { books } = require('../db/db.js')

const getBook = (req, res) => {
    const bookId = req.params.id
    const book = books.find((book) => {
        return book.id == bookId
    })
    if (!book) {
        res.json({ "book": {} })
    }
    res.json(book)
}

const getBooks = (req, res) => {
    // Check empty object
    if (Object.keys(req.query).length === 0) {
        return res.json(books)
    }
    const page = req.query.page
    const filterBooks = books.filter((book) => {
        return book.page == page
    })
    return res.json(filterBooks)
}

const createBook = (req, res)=>{
    const {title, author, page} = req.body
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