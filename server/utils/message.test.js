const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', function () {
  it('should generate the correct message object', function () {
    var from = "test";
    var text = "test text";
    var generatedMessage = generateMessage(from, text);

    expect(generatedMessage.createdAt).toBeA('number');
    expect(generatedMessage).toInclude({from,text});
  });
});
