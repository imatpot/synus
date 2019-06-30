require('dotenv').config();

const fs = require('fs');
const path = require('path');

exports.properties = {
  name: 'help',
  aliases: ['h'],
  description: 'Let me show you what I can do.',
  usage: 'synus help [command]'
};

exports.execute = (args, message, bot) => {
  let categoryTree = {};
  const prefixes = bot.environment.BOT_PREFIXES.split(',');
  const owner = (bot.environment.OWNER_ID === message.author.id);
  const commandsDirectory = path.resolve('./commands');

  // Load all categories
  let categories = fs.readdirSync(commandsDirectory).filter((dir) => {
    if (!owner && dir.toLowerCase() === 'owner') return false;
    return fs.lstatSync(path.join(commandsDirectory, dir)).isDirectory();
  });

  // Fill each category with commands
  categories.forEach((category) => {
    categoryTree[category] = [];
    const categoryDirectory = path.resolve(path.join(commandsDirectory, category));

    // Only take .js files
    const files = fs.readdirSync(categoryDirectory).filter((file) => {
      return file.endsWith('.js');
    });

    // Save commands to category in tree
    files.forEach((file) => {
      let command = require(`../${category}/${file}`);
      categoryTree[category].push({
        name: command.properties.name,
        aliases: command.properties.aliases,
        description: command.properties.description,
        usage: command.properties.usage
      });
    });
  });

  // General help, no command specified
  if (args.length === 0) {
    bot.console.log('No command for HELP specified');

    let output = '';
    let part = '';
    let requiredNameLength = 'prefixes'.length + 3;

    for (let cat in categoryTree) {
      categoryTree[cat].forEach((cmd) => {
        if (cmd.name.length + 3 > requiredNameLength) requiredNameLength = cmd.name.length + 3;
      });
    }

    // Output builder
    output += bot.formatter.codeBlock('PREFIXES'.padEnd(requiredNameLength) + prefixes.join(', '), 'apache');

    for (let cat in categoryTree) {
      part = '';

      part += cat.toUpperCase() + '\n\n';
      categoryTree[cat].forEach((cmd) => {
        part += cmd.name.padEnd(requiredNameLength) + cmd.description + '\n';
      });

      part = bot.formatter.codeBlock(part, 'apache');

      // Keep an eye on Discord message length limits
      if ((output + part).length > 2000) {
        bot.say(output, message);
        output = part;
      } else {
        output += part;
      }
    }

    part = bot.formatter.codeBlock('TIP'.padEnd(requiredNameLength) + 'For details, type synus help [command]', 'apache');

    // Keep an eye on Discord message length limits
    if ((output + part).length > 2000) {
      bot.say(output, message);
      output = part;
    } else {
      output += part;
    }
    bot.say(output, message);
  }

  // Help to specific command
  else {
    const request = args.shift();
    let command = {};
    let category = '';
    let output = '';

    // Fetch requested command
    for (let cat in categoryTree) {
      categoryTree[cat].forEach((cmd) => {
        if (cmd.name === request || cmd.name === bot.aliases.get(request)) {
          category = cat;
          command = cmd;
        }
      });
    }

    bot.console.log(`Loading HELP for ${command.name.toUpperCase()}`);

    // Command didn't result in valid outcome
    if (category === '' || command === {}) {
      bot.say(`Command \`${request}\` doesn't exist.`, message);
      return;
    }

    // Build output
    output += command.name.toUpperCase() + '\n\n';
    output += 'Category:     ' + category.charAt(0).toUpperCase() + category.slice(1) + '\n';
    if (command.aliases.length !== 0) output += 'Aliases:      ' + command.aliases.splice(0, 9).join(', ') + '\n';
    output += 'Description:  ' + command.description + '\n\n';
    output += 'Usage:        ' + command.usage;

    bot.say(bot.formatter.codeBlock(output, 'apache'), message);
  }
};
