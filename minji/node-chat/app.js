
const express = require('express')

const socket = require('socket.io')

const http = require('http')

const fs = require('fs')
//기본 내장 모듈 불러오기

const app = express()

const server = http.createServer(app)

const io = socket(server)

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))
//정적파일을 제공하기 위해 미들웨어를 사용하는 코드

app.get('/', function(request, response) {
    fs.readFile('./static/index.html', function(err, data) {
        if(err) {
            response.send('error')
        } else {
            response.writeHead(200, {'Content-Type' : 'text/html'})
            //잘 이해되지 않는 부분
            response.write(data)
            response.end()
        }
    })
})

//on()은 소켓에서 해당 이벤트를 받으면 콜백함수가 실행된다.
//'connection'이라는 이벤트가 발생 할 경우 콜백함수가 실행된다. (마찬가디로 기본이벤트)
//io.sockets는 접속되는 모든 소켓들을 의미한다.
io.sockets.on('connection', function(socket) {
    console.log('User connetion complete')

    //새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌
    socket.on('newUser', function(name) {
        console.log(name + 'connect')
        
        //소켓에 이름 저장 해두기
        socket.name = name

        //모든 유저에게 소켓에게 전송
        io.sockets.emit('update', {type: 'connect', name: 'SERVER', messaege : name + '님이 들어왔습니다.'})
    })

    //전송한 메시지 받기
    socket.on('message', function(data) {
        
        data.name = socket.name
        
        console.log(data)

        //보낸 사람을 제외한 나머지 유저에게 메시지 전송
        socket.broadcast.emit('update', data);
    })


    //이벤트명 지정하여 통신!
    // socket.on('send', function(data) {
    //     console.log('send message:', data.msg )
    // })


    //disconnect 는 socket.io의 기본 이벤트 연결 되어있던 소켓과 접속이 끊어지면 자동으로 실행된다.
    socket.on('disconnect', function() {
        console.log(socket.name + 'connection over')

        socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', messaege: socket.name + '님이 나가셨습니다.'})
    })

})
server.listen(3000, function() {
    console.log('server ing...')
})