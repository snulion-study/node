var express = require('express');

var router = express.Router();

var topic = require('../controllers/topicController.js');

router.get('/', topic.list);

router.get('/show/:id', topic.show);

router.get('/new', topic.new);

router.post('/save', topic.save);

router.get('/edit/:id', topic.edit);

router.post('/update/:id', topic.update);

router.post('/delete/:id', topic.delete);

module.exports = router;