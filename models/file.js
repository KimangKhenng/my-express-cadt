// models/tweet.js

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    originalname: { type: String, required: true },
    path: { type: String, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now },
    encoding: { type: String, required: true },
});

const File = mongoose.model('File', fileSchema);

const fileS3Schema = new mongoose.Schema({
    originalname: { type: String, required: true },
    location: { type: String, required: true },
    size: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now },
    encoding: { type: String, required: true },
    key: String,
    etag: String
});

const FileS3 = mongoose.model('FileS3', fileS3Schema);

module.exports = { File, FileS3 };