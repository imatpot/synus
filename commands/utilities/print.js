const echo = require('./echo.js').execute;

module.exports.properties = {
    name: 'print',
    aliases: ['echo-code'],
    description: 'Repeats your text in a code-block.',
    usage: 'synus print [text]',
}

module.exports.execute = (message, args, bot) => {
    if (Array.isArray(args)) echo(message, '```apache\n' + args.join(' ') + '```');
	else echo(message, '```apache\n' + args + '```');
}
