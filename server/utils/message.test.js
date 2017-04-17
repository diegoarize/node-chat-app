const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', function () {
  it('should generate the correct message object', function () {
    var from = "test";
    var text = "test text";
    var generatedMessage = generateMessage(from, text);

    expect(generatedMessage.createdAt).toBeA('number');
    expect(generatedMessage).toInclude({from,text});
  });
});

describe('generateLocationMessage', function () {
  it('should generate correct location object', function () {
    var from = "test";
    var longitude = 1;
    var latitude = 1;
    var url = `https://www.google.com/maps?q=${latitude},${longitude}`
    var generatedMessage = generateLocationMessage(from, latitude, longitude);


    expect(generatedMessage.createdAt).toBeA('number');
    expect(generatedMessage).toInclude({from, url});
  });
});
