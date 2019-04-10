require('dotenv').config();

const Discord = require('discord.js');

const fs = require('fs');
const path = require('path');
const echo = require('./commands/utilities/echo.js').execute;
const echoCode = require('./commands/utilities/echo-code.js').execute;

const token = process.env.BOT_TOKEN;
const prefixes = process.env.BOT_PREFIXES.split(',');

const commandsPath = path.resolve('./commands');
const bot = new Discord.Client();

bot.login(token);
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

let categories = fs.readdirSync(commandsPath).filter((dir) => {
	return fs.lstatSync(path.join(commandsPath, dir)).isDirectory();
});

categories.forEach((category) => {
	const categoryPath = path.resolve(path.join(commandsPath, category));

	const files = fs.readdirSync(categoryPath).filter((file) => {
		return file.endsWith('.js');
	});

	files.forEach((file) => {
		let command = require(`./commands/${category}/${file}`);
		bot.commands.set(command.metadata.name, command);
		
		command.metadata.aliases.forEach((alias) => {
			bot.aliases.set(alias, command.metadata.name);
		});
	});
});

bot.once('ready', () => {
	console.info('Synus booted successfully.');
	bot.user.setPresence({
		game: {
			name: 'hide and seek with bugs',
			type: 'STREAMING',
			url: 'https://www.twitch.tv/quonnz'
		}
	});
});

bot.on('message', (message) => {
	if (message.author.bot || !prefixes.includes(message.content.split(/ +/g).shift().toLowerCase())) return;
	if (prefixes.includes(message.content.trim())) {
		echo(message, 'Ready to help! Type `synus help` to get started.');
		return;
	}

	let args = message.content.split(/ +/g);
	args.shift(); // Remove prefix
	let command = args.shift().toLowerCase();

	if (!bot.commands.has(bot.aliases.get(command)) && !bot.commands.has(command)) {
		echo(message, `Command \`${command}\` does not exist.`);
		return;
	}
	
	try {
		if (bot.commands.has(command)) bot.commands.get(command).execute(message, args, bot);
		else bot.commands.get(bot.aliases.get(command)).execute(message, args, bot);
	} catch (error) {
		console.error(error);
		echo(message, `Hm. That didn't work. Try that \`${command}\` again.`);
	}
});
