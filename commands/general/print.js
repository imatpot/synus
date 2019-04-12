const echo = require('./echo.js').execute;
const formatter = require('../../util/text-formatter.js');

module.exports.properties = {
    name: 'print',
    aliases: ['echo-code'],
    description: 'Repeats your text in a code-block.',
    usage: 'synus print [text]',
}

module.exports.execute = (args, message, bot) => {
    if (Array.isArray(args)) echo(formatter.plainCodeBlock(args.join(' ')), message);
	else echo(formatter.plainCodeBlock(args), message);
}
