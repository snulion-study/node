const { auth } = require("../middleware/auth");

var express = require('express');

var router = express.Router();

var user = require('../controllers/userController.js');

router.get('/register', user.register);

router.post('/save', user.save);

router.get('/login', user.loginpage);

router.post('/login', user.login);

router.get('/logout', user.logout);

module.exports = router;