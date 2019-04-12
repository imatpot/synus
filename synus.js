require('dotenv').config();

const Discord = require('discord.js');

const fs = require('fs');
const path = require('path');
const echo = require('./commands/general/echo.js').execute;
const print = require('./commands/general/print.js').execute;
const hello = require('./commands/general/hello.js');

const token = process.env.BOT_TOKEN;
const prefixes = process.env.BOT_PREFIXES.split(',');

const commandsDirectory = path.resolve('./commands');
const bot = new Discord.Client();

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

let categories = fs.readdirSync(commandsDirectory).filter((dir) => {
	return fs.lstatSync(path.join(commandsDirectory, dir)).isDirectory();
});

categories.forEach((category) => {
	const categoryDirectory = path.resolve(path.join(commandsDirectory, category));

	const files = fs.readdirSync(categoryDirectory).filter((file) => {
		return file.endsWith('.js');
	});

	files.forEach((file) => {
		let command = require(`./commands/${category}/${file}`);
		bot.commands.set(command.properties.name, command);

		command.properties.aliases.forEach((alias) => {
			bot.aliases.set(alias, command.properties.name);
		});
		hello.getGreetingsNoFlag().forEach((greeting) => {
			bot.aliases.set(greeting, 'hello');
		});
	});
});

bot.once('ready', () => {
	console.info('Synus is ready to help.');
	bot.user.setPresence({
		game: {
			name: 'hide and seek with bugs',
			type: 'STREAMING',
			url: 'https://www.twitch.tv/quonnz'
		}
	});
});

bot.on('message', (message) => {
	if (message.author.bot) return;

	let args = message.content.split(/ +/g);

	// Typical dad joke
	if (args[0] != null && args[1] != null) {
		if (args[0].toLowerCase() == 'i\'m') {
			let name = args.slice(1).join(' ');
			echo(`Hi ${name}, I'm Synus.`, message);
			return;
		}
		else if (args[0].toLowerCase() == 'i' && args[1].toLowerCase() == 'am') {
			if (args[2] != null) {
				let name = args.slice(2).join(' ');
				echo(`Hi ${name}, I'm Synus.`, message);
				return;
			}
		}
	}

	// If it's not a dad joke, check if it has Synus' prefix
	if (!prefixes.includes(message.content.split(/ +/g).shift().toLowerCase())) return;

	// People who forget to type the actual command might appreciate this
	if (prefixes.includes(message.content.trim())) {
		echo('Ready to help! Type `synus help` to get started.', message);
		return;
	}

	let prefix = args.shift();
	let command = args.shift().toLowerCase();

	// At this point, only actual arguments are left in args

	if (!bot.commands.has(bot.aliases.get(command)) && !bot.commands.has(command)) {
		echo(`Command \`${command}\` doesn't exist.`, message);
		return;
	}

	try {
		if (bot.commands.has(command)) bot.commands.get(command).execute(args, message, bot);
		else bot.commands.get(bot.aliases.get(command)).execute(args, message, bot);
	} catch (error) {
		console.error(error);
		echo(`Hmm. That didn't work. Try that \`${command}\` again.`, message);
	}
});

bot.login(token);
