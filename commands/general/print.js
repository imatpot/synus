const echo = require('./echo.js').execute;

module.exports.properties = {
    name: 'print',
    aliases: ['echo-code'],
    description: 'Repeats your text in a code-block.',
    usage: 'synus print [text]',
}

module.exports.execute = (args, message, bot) => {
    if (Array.isArray(args)) echo('```apache\n' + args.join(' ') + '```', message);
	else echo('```apache\n' + args + '```', message);
}
