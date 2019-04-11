const echo = require('../general/echo.js').execute;
const print = require('../general/print.js').execute;

module.exports.properties = {
    name: 'laugh',
    aliases: ['xd','haha','hah'],
    description: 'Make Synus laugh at the previous message.',
    usage: 'synus laugh',
}

module.exports.execute = (args, message, bot) => {
    message.delete(1000);
    echo(bot.emojis.get('519958500164501515').toString(), message);
}
