const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => console.log('hi'));

let users = [
  { id: 1, name: "Kim" },
  { id: 2, name: "Park" },
  { id: 3, name: "Koo" },
  { id: 4, name: "Choi" },
  { id: 5, name: "Lee" },
]

app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10); // NaN
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.post('/users', (req, res) => {
  const name = req.body.name;
  const id = Date.now();
  const user = {id, name};

  if (!name) return res.status(400).end();

  users.push(user);
  res.status(201).send(user);
})
// app.get('/users/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const user = users.filter(user => )
// })

module.exports = app;