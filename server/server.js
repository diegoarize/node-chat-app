const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);

var io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User connected');

  socket.emit('newMessage', generateMessage("Admin","Welcome to the chat app"));

  socket.broadcast.emit('newMessage',
    generateMessage("Admin","New User joined on this chat"));


  socket.on('createMessage', (message, callback) => {
    console.log(`message at ${Date.now()}`, message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });
});



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
