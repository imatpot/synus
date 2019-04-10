const echo = require('./echo.js').execute;
const echoCode = require('./echo-code.js').execute;

module.exports.metadata = {
    name: 'help',
    aliases: ['h'],
    description: 'Shows a list of commands.',
}

module.exports.execute = (message, args, bot) => {
    echo(message, 'This command is yet to be added. No ETA for now.');
}
