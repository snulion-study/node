const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const mongoose = require('mongoose');
const config = require('./config/key');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB connected...')).catch(err => console.log(err))

const { User } = require("./models/User");

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.locals.pretty = true;

app.set('views','./views')
app.set('view engine','pug');

app.post('/register',(req,res)=>{
    const user = new User(req.body);
    user.save((err,userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success:true
        })
    })
})


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
