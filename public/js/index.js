var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createEmail', {
    to: 'receiver@example.com',
    text: 'Hey! :D'
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log('server message', message);
});

socket.emit('createMessage', {
  from: 'sender@client.com',
  text: 'I am chatting in this chat'
});
