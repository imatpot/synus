const echo = require('../general/echo.js').execute;
const print = require('../general/print.js').execute;
const formatter = require('../../util/text-formatter.js');

module.exports.properties = {
    name: 'laugh',
    aliases: ['xd','haha','hah'],
    description: 'Make Synus laugh at the previous message.',
    usage: 'synus laugh',
}

module.exports.execute = (args, message, bot) => {
    message.delete(1000);
    echo('Hahay pinnacle of comedy! ' + bot.emojis.get('565932951351590912').toString(), message);
}
