const echo = require('./echo.js').execute;
const print = require('./print.js').execute;
const formatter = require('../../util/text-formatter.js');

module.exports.properties = {
    name: 'ping',
    aliases: [],
    description: 'Pings Synus.',
    usage: 'synus ping',
}

module.exports.execute = (args, message, bot) => {
    // Make sure en emote with the ID 565320633471467525 is available in a server where Synus is a member of at all times
    echo(`${bot.emojis.get('565320633471467525').toString()}  \`${Math.floor(bot.ping)}ms\``, message);
}
