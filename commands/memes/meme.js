const echo = require('../utilities/echo.js').execute;
const echoCode = require('../utilities/echo-code.js').execute;

module.exports.metadata = {
    name: 'meme',
    aliases: ['meem'],
    description: 'meme',
}

module.exports.execute = (message, args, bot) => {
    message.channel.send('meme');
}
