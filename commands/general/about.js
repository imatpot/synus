const echo = require('./echo.js').execute;
const print = require('./print.js').execute;

module.exports.properties = {
    name: 'about',
    aliases: ['a'],
    description: 'A small introduction.',
    usage: 'synus about',
}

module.exports.execute = (args, message, bot) => {
    let introduction = '';
    introduction += 'Hello there! '
    introduction += `My name is \`Synus\`${bot.emojis.get('544618533493932032').toString()} \n\n`
    introduction += 'That\'s short for `systematically yielded, natively unobstrusive sidekick` \n';
    introduction += 'I\'m a multi-purpose Discord bot, ready to help with all kinds of stuff! \n\n';
    introduction += 'Type `synus help` to get started.'
    echo(introduction, message);
}
