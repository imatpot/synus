const discord = require('discord.js');
const client = new discord.Client();
const commandList = require('./commands/commands.js').commands;

const { discordToken, prefixes } = require('./config.json');

client.login(discordToken);

client.once('ready', () => {
	console.info('Synus ready for usage');
	client.user.setActivity('without anyone noticing');
});

client.on('message', message => {
	if (message.author.id != '561922821043781653') {
		const commandArray = message.content.split(' ');
		const messageStart = commandArray.shift();

		if (isBotPrefix(messageStart)) {
			const commandName = commandArray.shift().toLocaleLowerCase();
			const commandObject = commandList[commandName];

			if (commandName === 'help') {
				showHelp(message.channel);
			}
			else {
				commandObject == null ?
					message.channel.send(`Command \`${commandName}\` not found.`) :
					commandObject.func(message, commandArray);
			}
		}

		if (message.content.toLocaleLowerCase() == 'this is so sad') {
			message.channel.send('https://www.youtube.com/watch?v=kJQP7kiw5Fk');
		}
	}
});

function isBotPrefix(s) {
	let is = false;
	prefixes.forEach(p => {
		if (p === s) is = true;
	});
	return is;
}

function showHelp(channel) {
	const entries = Object.entries(commandList);
	let message = '```';
	let requiredNameLength = 3;
	
	// e[0] = command object name
	// e[1] = command object values
	entries.forEach(e => {
		if (e[0].length + 3 > requiredNameLength) requiredNameLength = e[0].length + 3;
	});
	let spaces;
	entries.forEach(e => {
		spaces = '';
		for (let i = requiredNameLength; i > e[0].length; i--) {
			spaces += ' ';
		}
		message += e[0] + spaces + e[1].desc + '\n';
	});
	channel.send(message + '```');
}