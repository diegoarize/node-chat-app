const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);

var io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User connected');

  socket.emit('newMessage', {
    from: "contact@server.com",
    text: "Welcome to this chat.",
    createdAt: Date.now()
  });

  socket.on('createMessage', (newMessage) => {
    console.log(`message at ${Date.now()}`, newMessage);
  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });
});



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
