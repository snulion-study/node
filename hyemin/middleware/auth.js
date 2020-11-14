var User = require("../models/User");

//로그인 로그아웃을 위한 cookieParser 설정
//const cookieParser = require('cookie-parser');

let auth = (req, res, next) => {
  //클라이언트 쿠키에서 토큰을 가져온다 (로그인될 때 쿠키에 x_auth라는 이름으로 저장되었던 쿠키)
  let token = req.cookies.x_auth;
  //토큰을 복호화한 후 유저를 찾는다
  User.findByToken(token, (err, user) => {
    if (err) {
      throw err;
    }
    //유저가 없으면 인증을 하지 않는다
    if (!user) {
      return res.json({ isAuth: false, error: true });
    } else {
      //유저가 있으면 인증을 해주는데, request에 토큰과 유저를 넣어서 보내준다
      req.token = token;
      req.user = user;
      //next는 middleware에서 빠져나가게 해주는 역할
      next();
    }
  });
};

module.exports = { auth };
