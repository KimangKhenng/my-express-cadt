const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    page: { required: true, type: Number },
    title: { required: true, type: String },
    description: { required: true, type: String },
    genre: { required: true, type: String },
    authors: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    createdDate: { type: Date, default: Date.now }
});
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;