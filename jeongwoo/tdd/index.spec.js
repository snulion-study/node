const request = require('supertest');
const should = require('should');
const app = require('./index');
const assert = require('assert');

describe('GET /users', () => {
  describe('성공시', () => {
    it('유저 객체를 담은 배열로 응답한다.', (done) => {
      request(app)
      .get('/users')
      .end((err, res) => {
        res.body.should.be.instanceOf(Array);
        done(); // 비동기로 이루어졌기 때문에 done이라고 써서 끝내줌 -> Timeout 생길 수 있음
      });
    });

    it('limit의 갯수만큼 반환한다.', (done) => {
      request(app)
      .get('/users?limit=3')
      .end((err, res) => {
        res.body.should.have.length(3);
        done();
      }); 
    }); 
  });

  describe('실패시', () => {
    it('limit이 숫자형이 아닌 경우 400 반환.', (done) => { // 400은 내가 잘못한 것
      request(app)
      .get('/users?limit=two')
      .expect(400)
      .end(done);
    }); 
  });
});

describe("GET /users/:id", () => {
  describe("성공시", () => {
    it('ID에 맞는 객체를 반환한다.', (done) => {
      request(app)
      .get('/users/4')
      .end((err, res) => {
        res.body.should.have.property('id', 4);
        done();
      });
    });
  });

  describe("실패시", () => {
    it('ID가 숫자형이 아닌 경우 400을 반환.', (done) => {
      request(app)
      .get('/users/four')
      .expect(400)
      .end(done);
    });
    it('ID에 맞는 객체가 없을 경우 404 반환.', (done) => {
      request(app)
      .get('/users/10')
      .expect(404)
      .end(done);
    });
  });
});


describe("DELETE /users/:id", () => {
  describe("성공시", () => {
    it("User 삭제시 204 반환", (done) => {
      request(app)
      .delete('/users/4')
      .expect(204)
      .end(done);
    });

  });

  describe("실패시", () => {
    it('ID가 숫자형이 아닌 경우 400 반환', (done) => {
      request(app)
      .delete('/users/ten')
      .expect(400)
      .end(done);
    });
  });
});

describe("POST /users", () => {
  describe("성공시", () => {
    it("user 생성시 201 응답 및 name 반환", (done) => {
      request(app)
      .post('/users').send({name: 'Sangyeon'})   // send로 request의 body에 넣어줌
      .expect(201)
      .end((err, res) => {
        res.body.should.have.property('name', 'Sangyeon');
        done();
      })
    });
  });

  describe("실패시", () => {
    it("user에 name이 없는 경우 400 반환", (done) => {
      request(app)
      .post('/users').send({title: 'Sangyeon'})   // send로 request의 body에 넣어줌
      .expect(400)
      .end(done);
    });

    it("User에 이미 중복된 name이 있는 경우 409 반환", (done) => {
      request(app)
      .post('/users').send({name: 'Kim'})   // send로 request의 body에 넣어줌
      .expect(409)
      .end(done);
    });
  });
});