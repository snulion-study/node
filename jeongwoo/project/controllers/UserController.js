const mongoose = require('mongoose');
const { User } = require('../models/User');


const userController = {};

userController.signup = function (req, res) {
  res.render('user/signup');
}

userController.create = function (req, res) {
  const user = new User(req.body);

  user.save()
  .then(result => {
    console.log(result);
    res.status(200).render('index');
  })
  .catch(err => {
    res.status(500).json({
      message: err
    });
    console.log(err);
  });
};

userController.signin = function (req, res) {
  User.findOne({ email: req.body.email}, (err, user) => {
    if (err) {
      return res.json({
        loginSuccess: false,
        message: "존재하지 않는 아이디입니다.",
      });
    }
    user.comparePassword(req.body.password)
    .then((isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 일치하지 않습니다.",
        });
      }

      user.generateToken()
      .then((user) => {
        res.cookie('x_auth', user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id })
            .render('/');
      })
      .catch((err) => {
        res.status(400).send(err);
      });
    })
    .catch((err) => res.json({ loginSuccess: false, err }));
  })
};

userController.login = function(req, res) {
  res.render('user/signin');
}

module.exports = userController;