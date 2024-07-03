const asyncHandler = require('express-async-handler')
const File = require('../models/file')

const uploadFile = asyncHandler(async (req, res) => {
    console.log(req.file)
    if (req.file == undefined) {
        throw new Error("No file founded!")
    } else {
        const file = new File(req.file)
        const path = "/app/" + file.path
        file.path = path
        const result = await file.save()
        return res.json(result)
    }
})

module.exports = { uploadFile }