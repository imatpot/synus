require('dotenv').config();

const Discord = require('discord.js');

const fs = require('fs');
const path = require('path');

const token = process.env.BOT_TOKEN;

const commandsDirectory = path.resolve('./commands');
const eventsDirectory = path.resolve('./events');
const bot = new Discord.Client();

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.formatter = require('./utils/text-formatter.js');
bot.echo = require('./commands/general/echo.js').execute;
bot.logger = require('./utils/logger.js');

const categories = fs.readdirSync(commandsDirectory).filter((dir) => {
	return fs.lstatSync(path.join(commandsDirectory, dir)).isDirectory();
});

categories.forEach((category) => {
	bot.logger.log(`Loading category ${category.toUpperCase()}`);
	const categoryDirectory = path.resolve(path.join(commandsDirectory, category));

	const files = fs.readdirSync(categoryDirectory).filter((file) => {
		return file.endsWith('.js');
	});

	files.forEach((file) => {
		const command = require(`./commands/${category}/${file}`);
		bot.commands.set(command.properties.name, command);
		bot.logger.log(`Loaded command ${command.properties.name.toUpperCase()}`);

		command.properties.aliases.forEach((alias) => {
			bot.aliases.set(alias, command.properties.name);
		});
	});
});

// Das a lot of greetings
bot.commands.get('hello').getGreetingsNoFlag().forEach((greeting) => {
	bot.aliases.set(greeting, 'hello');
});
bot.logger.log('Loaded greetings');

const events = fs.readdirSync(eventsDirectory).filter((file) => {
	return file.endsWith('.js');
});

events.forEach((event) => {
	const eventName = event.split('.js')[0];
	const eventFunction = require(`./events/${event}`);
	bot.logger.log(`Loading event ${eventName.toUpperCase()}`);
	// This is pretty neat, didn't expect it to work *that* well
	bot.on(eventName, eventFunction.bind(undefined, bot));
});

bot.login(token);
