var User = require("../models/User");
const cookieParser = require("cookie-parser");

var userController = {};

/**
 * @swagger
 *  user/register:
 *    get:
 *      tags:
 *      - user
 *      description: 유저 등록 페이지 로드.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      responses:
 *       302:
 *        description: 로그인 페이지 이동
 *
 */

userController.register = function (req, res) {
  res.render("../views/user/register");
};

/**
 * @swagger
 *  user/save:
 *    post:
 *      tags:
 *      - user
 *      description: 새로운 유저 db에 저장
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      responses:
 *       200:
 *        description: 정상적으로 유저 생성
 *       404:
 *        description: 유효하지 않은 요청
 *
 */

userController.save = function (req, res) {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    // 이런 부분 원래 error state code 보내주며 처리해야 하는데... badrequesterror 등
    if (err) {
      console.log(err);
      res.render("../views/user/register");
    } else {
      console.log("Successfully create user");
      res.redirect(`/topic`);
    }
  });
};

userController.loginpage = function (req, res) {
  res.render("../views/user/login");
};

/**
 * @swagger
 *  user/login:
 *    post:
 *      tags:
 *      - user
 *      description: 유저 로그인
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: email
 *        in: body
 *        description: "이메일 주소"
 *        required: true
 *        type: string
 *      - name: password
 *        in: body
 *        description: "비밀번호"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 성공적으로 로그인
 *       401:
 *        description: 비밀번호가 틀린 경우
 *
 */

userController.login = function (req, res) {
  //요청에서 입력된 이메일이 데이터베이스에 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      console.log(`No such email`, err);
      res.render("../views/user/login");
    } else {
      //이메일이 데이터베이스에 있는 경우, 비밀번호가 사용자가 입력한 비밀번호와 일치하는지 확인
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          console.log(`Wrong Password`, err);
          res.render("../views/user/login");
        } else {
          //비밀번호가 맞다면 토큰을 생성
          user.generateToken((err, user) => {
            if (err) {
              console.log(err);
              res.render("../views/user/login");
            } else {
              //x_auth 라는 이름으로 쿠키에 토큰을 저장함
              res.cookie("x_auth", user.token);
              console.log(`Login success !! user email:${user.email}`);
              res.redirect(`/topic`);
            }
          });
        }
      });
    }
  });
};

/**
 * @swagger
 *  user/logout:
 *    get:
 *      tags:
 *      - user
 *      description: 유저 로그아웃
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      responses:
 *       200:
 *        description: 성공적으로 로그아웃
 *       401:
 *        description: 유효하지 않은 토큰
 *
 */

userController.logout = function (req, res) {
  //클라이언트 쿠키에서 토큰을 가져온다 (로그인될 때 쿠키에 x_auth라는 이름으로 저장되었던 쿠키)
  let token = req.cookies.x_auth;
  //토큰을 복호화한 후 유저를 찾는다
  User.findByToken(token, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect(`/topic`);
    }
    //유저가 없으면 인증을 하지 않는다
    if (!user) {
      console.log("login X");
      res.redirect(`/topic`);
    } else {
      User.findOneAndUpdate({ _id: user._id }, { token: "" }, (err, user) => {
        if (err) {
          console.log(err);
          res.redirect(`/topic`);
        } else {
          console.log(`Logout success user email : ${user.email}`);
          res.redirect(`/topic`);
        }
      });
    }
  });
};

module.exports = userController;
