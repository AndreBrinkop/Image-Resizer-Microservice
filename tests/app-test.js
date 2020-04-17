const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')
const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp);
const request = chai.request(app);

const validExampleImageName = 'rainbow-640x427.jpg'
const validExampleImageDetails = {
    "name": "rainbow-640x427.jpg",
    "format": "jpeg",
    "height": 427,
    "width": 640
}


describe('POST /image-details', () => {
    it('should return details of provided image when called', done => {
        chai
            .request(app)
            .post('/image-details')
            .attach('image', fs.readFileSync('assets/' + validExampleImageName), validExampleImageName)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.deep.equal(validExampleImageDetails);
                done();
            });
    });
});

after(() => app.listen().close());