const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// mongoose.connect('mongodb+srv://minji0345:tjrrhwch722!@minji.lvtrc.mongodb.net/<dbname>?retryWrites=true&w=majority', {
//     useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
// }).then(() => console.log('MongoDB Connected...'))
//     .catch(err => console.log(err))

const db =mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    console.log('MongoDB Connected...')
})

mongoose.connect('mongodb+srv://minji0345:tjrrhwch722!@minji.lvtrc.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
});

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
// app.set("views", "./views_file");
// app.set("view engine", "pug");

// const router = require('./routes')(app)

const server = app.listen(3000, function () {
    console.log("Connected, 3000 port!");
});

const Book = require('./models/book');

const router = require('./routes')(app, Book);




