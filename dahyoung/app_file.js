var express = require('express');
var bodyParser = require('body-parser'); //bodyparser 읽어오기
var fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({ extended: false })) //bodyparser express 검색해서 찾으면 됨
app.locals.pretty = true;
app.set('views', './views_file'); //우리는 템플릿 엔진 파일을 views_file 파일 밑에 두겠다.
app.set('view engine', 'pug'); //어떠한 템플릿 엔진을 쓸 거냐면 -> pug 쓸 거다.

app.get('/topic/new', function(req,res){
    fs.readdir('data', function(err, files){
        if (err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics:files});
    });
});
app.get(['/topic', '/topic/:id'], function(req, res){
    fs.readdir('data', function(err, files){
        if (err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id){
        //id값이 있을 때 실행되는 코드
            fs.readFile('data/'+id, 'utf8', function(err, data){
                if (err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', {topics:files, title:id, description:data});
            })
        } else{
        //id값이 없을 때 실행되는 코드
            res.render('view', {topics:files, title:'Welcome', description: 'Hello, JavaScript for server.'}); 
        //render의 첫 번째 인자에는 템플릿을 뺀 '파일 이름'이 들어감. 두번째는 템플릿 파일 안으로 주입하고자 하는 데이터를 객체 안에 담아서 주입하면 됨.
        }
    })
});
// app.get('/topic/:id', function(req, res){
//     var id = req.params.id;
//     fs.readdir('data', function(err, files){
//         if (err){
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         fs.readFile('data/'+id, 'utf8', function(err, data){
//             if (err){
//                 console.log(err);
//                 res.status(500).send('Internal Server Error');
//             }
//             res.render('view', {topics:files, title:id, description:data});
//         })
//     })
// })
app.post('/topic', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, function(err){ //data 파일 안에 title 이름의 파일, 그 안에 description을 담은 내용
        if(err){
            console.log(err); //error가 발생하면 콘솔에는 에러 내용이 상세하게 보임.
            res.status(500).send('Internal Server Error');
        } //callback 함수에 에러가 있었다면.
        res.redirect('/topic/'+title);
        // res.send('HI, post, ' + req.body.title); //callback함수가 실행된 후에 response
    });
})

app.listen(3000, function(){
    console.log('Connected, 3000 port!');
})