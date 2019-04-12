const echo = require('../general/echo.js').execute;
const print = require('../general/print.js').execute;
const formatter = require('../../util/text-formatter.js');

module.exports.properties = {
    name: 'laugh',
    aliases: ['xd','haha','hah'],
    description: 'Make me laugh! Being a bot is lonely...',
    usage: 'synus laugh',
}

module.exports.execute = (args, message, bot) => {
    message.delete(1000);
    echo('Hahay pinnacle of comedy! ' + bot.emojis.get('565932951351590912').toString(), message);
}
