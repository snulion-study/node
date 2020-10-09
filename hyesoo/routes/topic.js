var express = require('express');

var router = express.Router();

var data = require('../controllers/topicController.js');

router.get('/', data.list);

router.get('/show/:id', data.show);

router.get('/new', data.new);

router.post('/save', data.save);

module.exports = router;