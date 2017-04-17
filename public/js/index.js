var socket = io();

function scrollToBottom() {
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

   if(clientHeight + scrollTop
     + newMessageHeight + lastMessageHeight >= scrollHeight) {

       messages.scrollTop(scrollHeight);     
   }
}

socket.on('connect', () => {
  console.log('Connected to server');

});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', (message) => {
  var formattedTime = moment(message.createdAt).format('h:mm a')

  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
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
