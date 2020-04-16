const express = require('express');
const multer = require("multer");
const sharp = require('sharp');

var app = express();
var imageUpload = multer().single('image');

app.post('/getInfo', function (req, res) {
    imageUpload(req, res, function (err) {
        if (err || req.file == undefined) {
            return res.status(400).end("Invalid request. Make sure the request body contains an image.");
        }
        const image = sharp(req.file.buffer);
        image.metadata().then(function (metadata) {
                return res.send({name: req.file.originalname, format: metadata.format, height: metadata.height, width: metadata.width});
            }).catch(function (error) {
            return res.status(422).send("Invalid 'image' file.");
        });
    });
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
