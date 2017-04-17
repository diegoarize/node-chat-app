var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log('server message', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url)

  li.append(a);

  $('#messages').append(li);
});


$('#message-form').on('submit', function (e) {
  e.preventDefault();
  var messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('');
  });
});

var locationButton = $('#send-location');

locationButton.on('click', () => {
  if(!navigator.geolocation) {
    return alert("Geolocation not Supported by your browser");
  }

  locationButton.attr('disable', 'disable').text('Sending location...');

  navigator.geolocation.getCurrentPosition((position) => {
    locationButton.removeAttr('disable').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    alert('Unable to fetch location');
    locationButton.removeAttr('disable').text('Send location');
  })

});
