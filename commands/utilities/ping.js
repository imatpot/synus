const echo = require('./echo.js').execute;
const echoCode = require('./echo-code.js').execute;

module.exports.metadata = {
    name: 'ping',
    aliases: [''],
    description: 'Pings Synus.',
}

module.exports.execute = (message, args, bot) => {
    // Make sure en emote with the ID 565320633471467525 is available in a server where Synus is a member of at all times
    echo(message, `${bot.emojis.get('565320633471467525').toString()}  \`${(Date.now() - message.createdTimestamp)}ms\``);
}
