const asyncHandler = require('express-async-handler')
const { File, FileS3 } = require('../models/file')

const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')

// Configure AWS SDK
const s3Clinet = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
})

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

const uploadFileS3 = asyncHandler(async (req, res) => {
    if (req.file == undefined) {
        throw new Error("No file founded!")
    } else {
        const file = new FileS3(req.file)
        const result = await file.save()
        return res.json(result)
    }
})

const deleteFileOnS3 = asyncHandler(async (req, res) => {
    const id = req.params.id
    const file = await FileS3.findById(id)
    const input = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: file.key,
    };
    const command = new DeleteObjectCommand(input)
    const response = await s3Clinet.send(command)
    const result = await FileS3.deleteOne({ _id: id })
    return res.json({ response, result })
})

module.exports = { uploadFile, uploadFileS3, deleteFileOnS3 }