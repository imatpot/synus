module.exports.metadata = {
    name: 'echo',
    aliases: ['e'],
    description: 'Synus repeats your input.',
}

module.exports.execute = (message, args, bot) => {
    if (Array.isArray(args)) message.channel.send(args.join(' '));
	else message.channel.send(args);
}
