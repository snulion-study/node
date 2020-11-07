# Node :  실시간 채팅 구현 하기

## 1.  환경 준비

콘솔창에서 

* npm init
* npm install express --save
* npm install socket.io --save


## 2.  서버

* app.js 생성 후

```javascript
const express = require('express')

const socket = require('socket.io')

const http = require('http')

const app = express()

const server = http.createServer(app)

const io = socket(server)

server.listen(3000, function() {
    console.log('server ing...')
})
```


* 서버 실행 완료 후 get 방식으로 얻어오는 코드 추가


```javascript
const express = require('express')

const socket = require('socket.io')

const http = require('http')

const app = express()

const server = http.createServer(app)

const io = socket(server)

app.get('/', function(request, response) {
    console.log('유저가 홈에 접속!')
    response.send('Hello, User!')
})
//

server.listen(3000, function() {
    console.log('server ing...')
})
```


## 3

* 상위 폴더에 static  파일 생성
* index.html 파일, css  폴더, js 폴더 생성
* css 폴더 안에 index.css 파일 생성

* index.html 코드 작성

```javascript
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>node-chat</title>
        <link rel="stylesheet" href="/css/index.css">
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/index.js"></script>
    </head>
    <body>
        <div id="main">
            Helloooo
        </div>
    </body>
</html>
```

* index.css 코드 작성

```javascript
#main {
    margin: auto 0;
    margin-top: 100px;
    background-color: gray;
    text-align: center;
    width: 200px;
}
```

```javascript
const express = require('express')

const socket = require('socket.io')

const http = require('http')

const fs = require('fs')
//추가

const app = express()

const server = http.createServer(app)

const io = socket(server)

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))
//추가

app.get('/', function(request, response) {
    fs.readFile('./static/index.html', function(err, data) {
        if(err) {
            response.send('error')
        } else {
            response.writeHead(200, {'Content-Type' : 'text/html'})
            response.write(data)
            response.end()
        }
    })
})
//추

server.listen(3000, function() {
    console.log('server ing...')
})
```


## 4   

* Array의 길이를 구할때는 .length 를 이용한다.

```javascript
const express = require('express')

const socket = require('socket.io')

const http = require('http')

const fs = require('fs')

const app = express()

const server = http.createServer(app)

const io = socket(server)

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

app.get('/', function(request, response) {
    fs.readFile('./static/index.html', function(err, data) {
        if(err) {
            response.send('error')
        } else {
            response.writeHead(200, {'Content-Type' : 'text/html'})
            response.write(data)
            response.end()
        }
    })
})

//추가
io.sockets.on('connection', function(socket) {
    console.log('User connetion complete')

    socket.on('send', function(data) {
        console.log('send message:', data.msg )
    })
    
    socket.on('disconnect', function() {
        console.log('connection over')
    })

})

//여기까지

server.listen(3000, function() {
    console.log('server ing...')
})
```
* index.html  수정

```javascript
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>node-chat</title>
        <link rel="stylesheet" href="/css/index.css">
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/index.js"></script>
    </head>
    <body>
        <div id="main">
            <input type="text" id="test">
            <button onClick="send()">send</button>
        </div>
    </body>
</html>
```

* js 폴더에 index.js 파일 생성

```javascript
var socket = io()

socket.on('connect', function() {
    var input = document.getElementById('test')
    input.value = 'connected'
})

function send() {
    var message = document.getElementById('test').value

    document.getElementById('test').value = ''

    socket.emit('send', {msg: message})
    
}
```

* 서버 실행 후 확인


## 5.

* app.js

```javascript
const express = require('express')

const socket = require('socket.io')

const http = require('http')

const fs = require('fs')

const app = express()

const server = http.createServer(app)

const io = socket(server)

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

app.get('/', function(request, response) {
    fs.readFile('./static/index.html', function(err, data) {
        if(err) {
            response.send('error')
        } else {
            response.writeHead(200, {'Content-Type' : 'text/html'})
            response.write(data)
            response.end()
        }
    })
})

//아랫부분 

io.sockets.on('connection', function(socket) {
    console.log('User connetion complete')

    socket.on('newUser', function(name) {
        console.log(name + 'connect')
        
        socket.name = name

        io.sockets.emit('update', {type: 'connect', name: 'SERVER', messaege : name + '님이 들어왔습니다.'})
    })

    socket.on('message', function(data) {
        
        data.name = socket.name
        
        console.log(data)

        socket.broadcast.emit('update', data);
    })


    //삭제
    // socket.on('send', function(data) {
    //     console.log('send message:', data.msg )
    // })


    socket.on('disconnect', function() {
        console.log(socket.name + 'connection over')

        socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', messaege: socket.name + '님이 나가셨습니다.'})
    })

})
server.listen(3000, function() {
    console.log('server ing...')
})
```
* index.js 수정

```javascript
var socket = io()

//접속 되었을 때 실행 
socket.on('connect', function() {
  //이름을 입력받고
    var name = prompt('반갑습니다!', '')

    // 이름이 빈칸인 경우
    if(!name) {
        name = '익명'
    }

    // 서버에 새로운 유저가 왔다고 알림 
    socket.emit('newUser', name)
    })

    //서버로부터 데이터 받은 경우
    socket.on('update', function(data) {
    var chat = document.getElementById('chat')

    var message = document.createElement('div')
    var node = document.createTextNode(`${data.name} : ${data.message}`)
    var className = ''

    // 타입에 따라 적용할 클래스를 다르게 지정
    switch(data.type) {
        case 'message':
        className = 'other'
        break

        case 'connect':
        className = 'connect'
        break

        case 'disconnect':
        className = 'disconnect'
        break
    }

    message.classList.add(className)
    message.appendChild(node)
    chat.appendChild(message)
    })

    // 메시지 전송 함수 
    function send() {
    // 입력되어있는 데이터 가져오기
    var message = document.getElementById('test').value
    
    // 가져왔으니 데이터 빈칸으로 변경
    document.getElementById('test').value = ''

    // 내가 전송할 메시지 클라이언트에게 표시
    var chat = document.getElementById('chat')
    var msg = document.createElement('div')
    var node = document.createTextNode(message)
    msg.classList.add('me')
    msg.appendChild(node)
    chat.appendChild(msg)

    // 서버로 message 이벤트 전달 + 데이터와 함께
    socket.emit('message', {type: 'message', message : message})
}
```

* index.html 수정

```javascript
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>채팅</title>
        <link rel="stylesheet" href="/css/index.css">
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/index.js"></script>
    </head>
    <body>
        <div id="main">
        <div id="chat">
            <!-- 채팅 메시지 영역 -->
        </div>
        <div>
            <input type="text" id="test" placeholder="메시지를 입력해주세요..">
            <button  onclick="send()">send</button>
        </div>
        </div>
    </body>
</html>
```

* index.css  간단하게 수정

```javascript
/* 메인 */
#main {
    margin: auto;
    margin-top: 100px;
    border-radius: 20px;
    background-color: rgba(200,200,200,0.8);
    text-align: center;
    width: 500px;
    height: 800px;
    }
    
    /* 채팅 영역 */
    #chat {
        height: 90%;
        width: 100%;
        overflow-y: auto;
    }
    
    /* 접속 알림 */
    .connect {
        width: 90%;
        margin: auto;
        text-align: center;
        margin-top: 10px;
        border-bottom: 1px solid black;
        padding: 10px;
    }
    
    /* 접속 종료 알림 */
    .disconnect {
        width: 90%;
        margin: auto;
        border-bottom: 1px solid black;
        text-align: center;
        margin-top: 10px;
        padding: 10px;
    }
    
    /* 내가 보낸 메시지 */
    .me {
        width: 40%;
        margin-left: 50%;
        background-color: white;
        border-radius: 5px;
        margin-top: 10px;
        text-align: right;
        padding: 10px;
    }
    
    /* 상대방이 보낸 메시지 */
    .other {
        width: 40%;
        margin-left: 10%;
        background-color: white;
        border-radius: 5px;
        margin-top: 10px;
        text-align: left;
        padding: 10px;
    }
    
    input#test{
        width: 80%;
        border: none;
        padding: 10px;
        border-radius: 5px;
    }

    button{
        border:none;
        background-color :white;
        padding: 10px;
        border-radius: 5px;
    }

    button:hover{
        cursor: pointer;
    }
 ```
 
 * node app.js 실행!
