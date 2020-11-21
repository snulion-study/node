const { json } = require('express');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => console.log('hi'));

app.get('/', (req, res) => res.send('Hello Wolrd!'));

let users = [
  { id: 1, name: "Kim" },
  { id: 2, name: "Hong" },
  { id: 3, name: "Koo" },
  { id: 4, name: "Choi" },
  { id: 5, name: "Park" },
]

app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10); // 10진법
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const user = users.filter(user => user.id === id)[0];
  if (!user) return res.status(404).end();
  res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  users = users.filter(user => user.id !== id);
  res.status(204).end();
});

app.post('/users', (req, res) => {
  const name = req.body.name;
  const id = Date.now();
  const user = {id, name};

  if (!name) return res.status(400).end();

  const user_len = users.filter(user => user.name === name).length;
  if (user_len) return res.status(409).end();

  users.push(user);
  res.status(201).send(user);
})

module.exports = app;