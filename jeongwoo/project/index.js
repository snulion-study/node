const express = require('express');
const app = express();

const middleware = (req, res, next) => {

  next();
};

const errorMiddleware = (err, req, res, next) => {

};

const users = [
  {name: 'Paul'},
  {name: 'Sylvie'},
  {name: 'John'},
]


app.use(middleware);
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Hello Node!');
});

app.get('/users', (req, res) => {
  res.json(users);
});

module.exports = app;