const discord = require('discord.js');
const client = new discord.Client();
const loader = require('./categories/loaders.js').commands;
const util = require('./util.js');

const { discordToken } = require('./config.json');

let categories = {
	'commands': require('./categories/commands.js').commands,
	'memes': require('./categories/memes.js').commands,
};

client.login(discordToken);

client.once('ready', () => {
	console.info('Synus ready for usage');
	client.user.setActivity('without anyone noticing', 'https://www.twitch.tv/quonnz');
});

client.on('message', message => {
	// Do not check messages by Synus himself
	if (message.author.id != '561922821043781653') {
		const commandArray = message.content.split(' ');
		const messageStart = commandArray.shift();

		if (util.isBotPrefix(messageStart)) {
			const commandName = commandArray.shift().toLocaleLowerCase();

			// At this point, only possible params are left in commandArray

			if (commandName === 'help') {
				showHelp(message.channel, commandArray[0]);
			}
			else if (commandName === 'load' || commandName === 'unload') {
				console.log(categories);
				if (categories.hasOwnProperty(commandArray[0])) {
					categories = loader[commandName].func(message.channel, commandArray[0], categories);
				}
				else {
					message.channel.send(util.makeCodeBlock(`Category ${commandArray[0]} not found`));
				}
			}
			else {
				let commandObject = null;

				// c[0] = Category name
				// c[1] = Category value (require)
				Object.entries(categories).forEach(c => {
					if (c[1] != null) {
						if (c[1][commandName] != null) {
							commandObject = c[1][commandName];
						}
					}
				});

				commandObject == null ?
					message.channel.send(util.makeCodeBlock(`Command ${commandName} not found.`)) :
					commandObject.func(message, commandArray);
			}
		}

		// Could be moved to meme.js but I can't be bothered
		if (message.content.toLocaleLowerCase() == 'this is so sad') {
			if (categories.meme != null) {
				message.channel.send('https://youtu.be/_F-wQVdmuns');
			}
		}
	}
});


function showHelp(channel, commandName) {
	let categoriesChecked = 1;
	
	Object.entries(categories).forEach(commandListArr => {
		let message = '';
		// commandArr[1] = Array of category's command entries
		const commandList = commandListArr[1];

		if (commandName != null) {
			if (commandList[commandName] == null) {
				if (categoriesChecked == Object.entries(categories).length) {
					message += `Command ${commandName} not found.`;
				}
				else {
					categoriesChecked++;
				}
			}
			else {
				message += commandList[commandName].desc;
			}
		}
		else {
			const entries = Object.entries(commandList);
			let requiredNameLength = 3;

			// e[0] = Entry name
			// e[1] = Entry values (desc & func)
			entries.forEach(e => {
				if (e[0].length + 3 > requiredNameLength) requiredNameLength = e[0].length + 3;
			});
			let spaces;
			
			// TODO: Fix why \n\n completely removes commandListArr[0] from message
			// commandArr[1] = Category name
			// message += commandListArr[0].toUpperCase() + '\n\n';

			entries.forEach(e => {
				spaces = '';
				// Calculate required spaces for indent
				for (let i = requiredNameLength; i > e[0].length; i--) {
					spaces += ' ';
				}
				message += e[0] + spaces + e[1].desc + '\n';
			});
		}
		// Catch empty message
		if (message != '') {
			channel.send(util.makeCodeBlock(message));
		}
	});
}