const echo = require('./echo.js').execute;

module.exports.metadata = {
    name: 'echo-code',
    aliases: ['ec'],
    description: 'Synus repeats your input in a code-block.',
}

module.exports.execute = (message, args, bot) => {
    if (Array.isArray(args)) echo(message, '```' + args.join(' ') + '```');
	else echo(message, '```' + args + '```');
}
