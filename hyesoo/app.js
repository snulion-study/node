const express = require('express');
const app = express();

//bodyParser 설정
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//로그인 로그아웃을 위한 cookieParser 설정
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//MongoDB 연결
const mongoose = require('mongoose');
const config = require('./config/key');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB connected...')).catch(err => console.log(err))

//User model
const user = require('./routes/user');
app.use('/accounts',user);

//meal model and router
const meal = require('./routes/meal');
app.use('/meal',meal);

// 클라이언트 웹브라우저에서 소스보기 했을때에 코드를 예쁘게 정리해주는 기능
app.locals.pretty = true;

// 템플릿이 있는 디렉토리 설정
app.set('views','./views')
// 사용할 템플릿 엔진 설정
app.set('view engine','pug');

app.listen(3000,function(){
    console.log('Connected, 3000 port!');
})
