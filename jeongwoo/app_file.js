const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.locals.pretty = true;
app.listen(3000, () => {
  console.log('Connected 3000 port!');
})
app.set('views', './views_file');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/topic/new', (req, res) => {
  fs.readdir('data', (err, files) => {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', {topics: files});
  });
});
app.get(['/topic', '/topic/:id'], (req, res) => {
  fs.readdir('data', (err, files) => {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    const id = req.params.id; // 없다면 null / undefined
    if (id) {
      // id 값이 있을 때
    fs.readFile('data/'+id, 'utf8', (err, data) => {
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      res.render('view', {title: id, topics: files, description: data});
    });
    } else {
      // id 값이 없을 때
    res.render('view', {topics : files, title:'Welcome', description:'Hello, JavaScript for server.'});
    }
  });
});
app.post('/topic', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  fs.writeFile('data/' + title, description, (err) => {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/'+title);
    // res.send('success'); // 왜 얘가 여기로 들어와야 할까?
  })
});