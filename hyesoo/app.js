const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.locals.pretty = true;

app.set('views','./views')
app.set('view engine','pug');

app.get('/topic/new',function(req,res){
    fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new',{topics:files});
    })
})

app.get(['/topic','/topic/:id'],function(req,res){
    fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id){
            fs.readFile('data/'+id,'utf8',function(err,data){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view',{topics:files, title:id, content:data})
            })
        } else {
            res.render('view',{topics:files,title:"Welcome",content:"Javascript"});
        }
    })
})

app.post('/topic',function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title,description,function(err){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    })
})

app.listen(3000,function(){
    console.log('Connected, 3000 port!');
})
