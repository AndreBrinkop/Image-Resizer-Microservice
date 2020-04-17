const server = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')
const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp);
const request = chai.request(server);

const validExampleImageName = 'rainbow-640x427.jpg'
const validExampleImageDetails = {
    "name": "rainbow-640x427.jpg",
    "format": "jpeg",
    "height": 427,
    "width": 640
}
const pdfFileName = "test.pdf"

describe('POST /image-details', () => {
    it('should return details of provided image when called', done => {
        chai
            .request(server)
            .post('/image-details')
            .attach('image', fs.readFileSync('assets/' + validExampleImageName), validExampleImageName)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.deep.equal(validExampleImageDetails);
                done();
            });
    });
    it('should return HTTP 400 because request does not contain an image', done => {
        chai
            .request(server)
            .post('/image-details')
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('should return HTTP 422 because request does contain a PDF file instead of an image', done => {
        chai
            .request(server)
            .post('/image-details')
            .attach('image', fs.readFileSync('assets/' + pdfFileName), pdfFileName)

            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });
});

after(() => server.close());