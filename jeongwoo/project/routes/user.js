const express = require('express');
const router = express.Router();
const user = require('../controllers/UserController');
const auth = require('../middlewares/auth');
const { User } = require('../models/User');

router.get('/signup', user.signup);
router.post('/', user.create);

router.get('/signin', user.login);
router.post('/signin', user.signin);
router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
      .then((user) => {
        res.clearCookie('x_auth');
        res.status(200).send({ success: true, });
      })
      .catch((err) => res.json({ success: false, err }));
})

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
  });
});

module.exports = router;