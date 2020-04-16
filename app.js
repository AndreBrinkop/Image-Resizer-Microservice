const express = require('express');
const multer = require("multer");
const sharp = require('sharp');

var app = express();

var storage = multer.memoryStorage();
var upload = multer({ storage: multer.memoryStorage() });

app.post('/getInfo', upload.single('image'), function (req, res) {
    const image = sharp(req.file.buffer);
    image
        .metadata()
        .then(function (metadata) {
            res.send({name: req.file.originalname, format: metadata.format, height: metadata.height, width: metadata.width});
        }).catch(function (error) {
            res.status(422).send("Invalid 'image' file.");
        });
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
