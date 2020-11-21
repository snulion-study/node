const app = require('./index');
const assert = require('assert');
const should = require('should');
const request = require('supertest');

// get /users
// 유저 객체를 담은 배열을 응답
// get /users?limit=10
// limit 갯수만큼 유저를 반환한다.


describe("GET /users", () => {
  describe("성공시", () => {
    it('return user object array', (done) => {
      request(app)
      .get('/users')
      .end((err, res) => {
        res.body.should.be.instanceOf(Array);
        done();
      });
    });

    it('return limits count', (done) => {
      request(app)
      .get('/users?limit=3')
      .end((err, res) => {
        res.body.should.have.length(3);
        done();
      });
    })
  })

  describe("실패시", () => {
    it('if limit is not int, return 400', (done) => {
      request(app)
      .get('/users?limit=two')
      .expect(400)
      .end(done);
    })
  })
});



describe("POST /users", () => {
  describe("성공시", () => {
    it('user 생성시 201 응답 및 name 반환', (done) => {
      request(app)
      .post('/users').send({name: 'JW'})
      .expect(201)
      .end((err, res) => {
        res.body.should.have.property('name', 'JW');
        done();
      });
    });

    it('return limits count', (done) => {
      request(app)
      .get('/users?limit=3')
      .end((err, res) => {
        res.body.should.have.length(3);
        done();
      });
    })
  })

  describe("실패시", () => {
    it('not name, return 400', (done) => {
      request(app)
      .post('/users').send({title: 'sdfsdf'})
      .expect(400)
      .end(done);
    })
  })
});