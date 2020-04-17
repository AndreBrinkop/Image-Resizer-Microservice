const express = require('express')
const multer = require('multer')
const sharp = require('sharp')

var app = express()
var imageUpload = multer().single('image')

app.post('/image-details', function (req, res) {
    imageUpload(req, res, function (err) {
        if (err || req.file === undefined) {
            return res.status(400).end('Invalid request. Make sure the request body contains an image.')
        }
        const image = sharp(req.file.buffer)
        image.metadata().then(function (metadata) {
            return res.send({
                name: req.file.originalname,
                format: metadata.format,
                width: metadata.width,
                height: metadata.height
            })
        }).catch(function () {
            return res.status(422).send("Invalid 'image' file.")
        })
    })
})

app.post('/resize-image', function (req, res) {
    imageUpload(req, res, function (err) {
        if (err || req.file === undefined) {
            return res.status(400).end('Invalid request. Make sure the request body contains an image.')
        }
        const height = parseInt(req.body.height)
        const width = parseInt(req.body.width)
        if (isNaN(height) || height < 1) {
            return res.status(422).end("Invalid request. Make sure the 'height' parameter is a positive integer value.")
        }
        if (isNaN(width) || width < 1) {
            return res.status(422).end("Invalid request. Make sure the 'width' parameter is a positive integer value.")
        }

        const image = sharp(req.file.buffer)
        image.resize(width, height, {fit: 'contain'})
            .toBuffer()
            .then(function (resized) {
                return res.end(resized, 'binary')
            })
            .catch(function () {
                return res.status(422).send("Invalid 'image' file.")
            })
    })
})

const server = app.listen(3000, function () {
    console.log('ImageResizer is listening on port 3000!')
})

exports = module.exports = server;