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

module.exports = { getBook, getBooks }