/**
 * express는 http server에 제공될 function handler로 app을초기화 한다
 **/
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

//route handler
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//connection 이벤트 기다리다가 연결되면 로깅해라.
io.on('connection', (socket) => {
  console.log('a user connected');
	//서버가 chat message event를 받는다!
	socket.on('chat message', (msg) => {
		//서버가 chat message event를 client에 던진다!
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
	//새로고침하면 disconnected 됐다가 다시 connected됨.
	socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//server야 3000에서 대기하거라.
server.listen(3000, () => {
  console.log('listening on *:3000');
});
