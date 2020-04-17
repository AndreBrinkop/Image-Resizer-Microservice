const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')
const sharp = require('sharp')
const server = require('../app')
const expect = chai.expect

chai.use(chaiAsPromised)
chai.use(chaiHttp)
chai.should()
chai.request(server)

const validExampleImageName = 'rainbow-640x427.jpg'
const validExampleImageDetails = {
  name: 'rainbow-640x427.jpg',
  format: 'jpeg',
  height: 427,
  width: 640
}
const pdfFileName = 'test.pdf'

describe('POST /image-details', () => {
  it('should return details of provided image when called', done => {
    chai
      .request(server)
      .post('/image-details')
      .attach('image', fs.readFileSync('tests/assets/' + validExampleImageName), validExampleImageName)
      .end((err, res) => {
        expect(err).to.be.a('null')
        res.should.have.status(200)
        expect(res.body).to.deep.equal(validExampleImageDetails)
        done()
      })
  })
  it('should return HTTP 400 because request does not contain an image', done => {
    chai
      .request(server)
      .post('/image-details')
      .end((err, res) => {
        expect(err).to.be.a('null')
        res.should.have.status(400)
        done()
      })
  })
  it('should return HTTP 422 because request does contain a PDF file instead of an image', done => {
    chai
      .request(server)
      .post('/image-details')
      .attach('image', fs.readFileSync('tests/assets/' + pdfFileName), pdfFileName)
      .end((err, res) => {
        expect(err).to.be.a('null')
        res.should.have.status(422)
        done()
      })
  })
})

async function getImageDimensions (imageData) {
  const image = sharp(imageData)
  const metadata = await image.metadata()
  return {
    width: metadata.width,
    height: metadata.height
  }
}

const binaryParser = function (res, cb) {
  res.setEncoding('binary')
  res.data = ''
  res.on('data', function (chunk) {
    res.data += chunk
  })
  res.on('end', function () {
    cb(null, Buffer.from(res.data, 'binary'))
  })
}

describe('POST /resize-image', () => {
  it('should return a resized version of provided image when called', done => {
    const resizingDimensions = {
      width: 250,
      height: 280
    }

    chai
      .request(server)
      .post('/resize-image')
      .attach('image', fs.readFileSync('tests/assets/' + validExampleImageName), validExampleImageName)
      .field('height', resizingDimensions.height)
      .field('width', resizingDimensions.width)
      .parse(binaryParser)
      .end((err, res) => {
        expect(err).to.be.a('null')
        res.should.have.status(200)
        return expect(Promise.resolve(getImageDimensions(res.body)))
          .to.eventually.deep.equal(resizingDimensions).notify(done)
      })
  })
  it('should return HTTP 400 because request does not contain an image', done => {
    chai
      .request(server)
      .post('/resize-image')
      .end((err, res) => {
        expect(err).to.be.a('null')
        res.should.have.status(400)
        done()
      })
  })
  it('should return HTTP 422 because request does contain a PDF file instead of an image', done => {
    chai
      .request(server)
      .post('/resize-image')
      .attach('image', fs.readFileSync('tests/assets/' + pdfFileName), pdfFileName)
      .end((err, res) => {
        expect(err).to.be.a('null')
        res.should.have.status(422)
        done()
      })
  })
})

after(() => server.close())
