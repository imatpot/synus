exports.properties = {
    name: 'echo',
    aliases: ['e'],
    description: 'Wow, such a big cave!',
    usage: 'synus echo [text]'
};

exports.execute = (args, message, bot) => {
    if (Array.isArray(args)) message.channel.send(args.join(' '));
	else message.channel.send(args);
};
