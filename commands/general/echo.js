const formatter = require('../../util/text-formatter.js');

module.exports.properties = {
    name: 'echo',
    aliases: ['e'],
    description: 'Wow, such a big cave!',
    usage: 'synus echo [text]'
};

module.exports.execute = (args, message, bot) => {
    if (Array.isArray(args)) message.channel.send(args.join(' '));
	else message.channel.send(args);
};
