const express = require('express')

const socket = require('socket.io')

const http = require('http')

const app = express()

const server = http.createServer(app)

const io = socket(server)

server.listen(3000, function() {
    console.log('server ing...')
})