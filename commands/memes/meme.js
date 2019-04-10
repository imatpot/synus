const echo = require('../utilities/echo.js').execute;
const echoCode = require('../utilities/print.js').execute;

module.exports.properties = {
    name: 'meme',
    aliases: ['meem'],
    description: 'meme',
    usage: 'synus meme',
}

module.exports.execute = (message, args, bot) => {
    message.channel.send('meme');
}
