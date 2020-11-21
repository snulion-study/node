const app = require('./index');
const assert = require('assert');
const should = require('should');
const request = require('supertest');

// users나 tasks 같이 큰 단위로 묶음
describe('GET /users', () => { // 이름은 지어주기 나름
  it('첫 번째 테스트', (done) => { // done은 변수라고 함
    // assert.equal(1,2); // equal : 첫번째 인자와 두번째 인자가 같으면 통과, 같지 않으면 오류 => 테스트 해보자!
    // (1).should.equal(1); // 위와 같은 코드. 영어의 어순과 같음
    done(); // 테스트가 종료 되었음을 선언
  });

  it('응답값이 배열이고, name 속성을 포함한다.', (done) => {
    // supertest가 내부적으로 서버를 구동하는 코드
    request(app)
      .get('/users')
      .end((err, res) => {
        // Q. 응답값이 배열인가 ?
        res.body.should.be.instanceOf(Array);
        // Q. 배열 내에 name이라는 key가 있는가?
        res.body.forEach((user) => {
          user.should.have.property('name');
        });
        done();
      });
  });

  it('콘솔에 출력한다.', (done) => {
    request(app)
        .get('/users')
        .end((err, res) => {
          // throw err;
          console.log('******** 세번째 테스트 통과! ********');
          done();
        })
  });
});