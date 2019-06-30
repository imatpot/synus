require('dotenv').config();

const Discord = require('discord.js');

const fs = require('fs');
const path = require('path');

const commandsDirectory = path.resolve('./commands');
const eventsDirectory = path.resolve('./events');

const bot = new Discord.Client();

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.formatter = require('./utils/textFormatter.js');
bot.say = require('./commands/general/echo.js').execute;
bot.console = require('./utils/console.js');
bot.permissions = require('./utils/permissions.js');
bot.environment = process.env;

const botToken = bot.environment.BOT_TOKEN;

const categories = fs.readdirSync(commandsDirectory).filter((dir) => {
  return fs.lstatSync(path.join(commandsDirectory, dir)).isDirectory();
});

// TODO: Recursive automatic category loader => Enables adding subcategories

categories.forEach((category) => {
  bot.console.log(`Loading category ${category.toUpperCase()}`);
  const categoryDirectory = path.resolve(path.join(commandsDirectory, category));

  const files = fs.readdirSync(categoryDirectory).filter((file) => {
    return file.endsWith('.js');
  });

  files.forEach((file) => {
    const command = require(`./commands/${category}/${file}`);
    bot.console.log(`Loading command ${command.properties.name.toUpperCase()}`);
    bot.commands.set(command.properties.name, command);

    command.properties.aliases.forEach((alias) => {
      bot.aliases.set(alias, command.properties.name);
    });
  });
});

bot.console.log('Loading greetings');

bot.commands.get('hello').getGreetingsNoFlag().forEach((greeting) => {
  bot.aliases.set(greeting, 'hello');
});

const events = fs.readdirSync(eventsDirectory).filter((file) => {
  return file.endsWith('.js');
});

events.forEach((event) => {
  const eventName = event.split('.js')[0];
  const eventFunction = require(`./events/${event}`);

  bot.console.log(`Loading event ${eventName.toUpperCase()}`);
  bot.on(eventName, eventFunction.bind(undefined, bot));
});

bot.login(botToken);
