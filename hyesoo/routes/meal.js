var express = require('express');

var router = express.Router();

var meal = require('../controllers/MealController.js');

router.get('/', meal.list);

router.get('/show/:id', meal.show);

router.get('/new', meal.new);

router.post('/save', meal.save);

router.get('/edit/:id', meal.edit);

router.post('/update/:id', meal.update);

router.post('/delete/:id', meal.delete);

router.get('/brand/:id', meal.brand);

module.exports = router;