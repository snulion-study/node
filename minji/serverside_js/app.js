var express = require('express')
var app = express();
app.use(express.static('public'));
// 위 디렉토리를 만들고 가져다 놓아야 함
app.get('/', function(req, res){
    res.send('Hello home page');
});
app.get('/login', function(req, res){
    res.send('Login please');
})

app.get('/new', function(req, res){
    res.send('<h1>Login please</h1>');
})
app.listen(3000, function() {
console.log('Connected 3000 port!');
});
