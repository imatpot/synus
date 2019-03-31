const discord = require('discord.js');
const client = new discord.Client();
const commandList = require('./commands/commands.js').commands;

const { discordToken, prefix } = require('./config.json');
const prefixRegex = new RegExp(`^(${prefix})`, 'g');

client.login(discordToken);

client.once('ready', () => {
	console.info('synus ready for usage');
});

client.on('message', message => {
	if (message.content.startsWith(prefix)) {
		const commandArray = message.content.replace(prefixRegex, '').split(' ');
		const commandName = commandArray[0];
		const commandParams = commandArray.shift();
		const commandMethod = commandList[commandName];
		
		commandMethod == null ?
			message.channel.send(`Command \`${commandName}\` not found.`) :
			commandMethod(message, commandParams);
	}
});