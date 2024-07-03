const express = require('express')
const { uploadFile } = require('../controllers/file')
const { upload } = require('../middlewares/upload')
const fileRouter = express.Router()

fileRouter.post('/', upload, uploadFile)

module.exports = fileRouter
