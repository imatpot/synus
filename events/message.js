require('dotenv').config();
const hello = require('../commands/general/hello.js');
const prefixes = process.env.BOT_PREFIXES.split(',');

module.exports = (bot, message) => {
    // if (message.author.bot) return;

	const args = message.content.split(/ +/g);

	// Ping by mention
	if (message.isMentioned(bot.user.id)) { bot.commands.get('ping').execute(args, message, bot); }

	// Typical dad joke
	if (args[0] !== undefined && args[1] !== undefined) {
		if (args[0].toLowerCase() === 'i\'m') {
			const name = args.slice(1).join(' ');
			bot.echo(`${hello.getGreeting()}, ${name}! I'm Synus.`, message);
			return;
		}
		else if (args[0].toLowerCase() === 'i' && args[1].toLowerCase() === 'am') {
			if (args[2] !== undefined) {
				const name = args.slice(2).join(' ');
				bot.echo(`${hello.getGreeting()}, ${name}! I'm Synus.`, message);
				return;
			}
		}
	}

	// Check if it has Synus' prefix
	if (!prefixes.includes(message.content.split(/ +/g).shift().toLowerCase())) return;

	// People who forget to type the actual command might appreciate this
	if (prefixes.includes(message.content.trim())) {
		bot.echo('Ready to help! Type `synus help` to get started.', message);
		return;
	}

	const prefix = args.shift();
	let command = args.shift().toLowerCase();

	// At this point, only actual arguments are left in args

	if (!bot.commands.has(bot.aliases.get(command)) && !bot.commands.has(command)) {
		bot.echo(`Command \`${command}\` doesn't exist.`, message);
		return;
	}

	try {
		if (!bot.commands.has(command)) command = bot.aliases.get(command);
		bot.commands.get(command).execute(args, message, bot);
		bot.logger.command(`${message.author.tag} ran ${command.toUpperCase()} in ${message.guild.name} (${message.guild.id})`);
	} catch (error) {
		bot.logger.error(`${command.toUpperCase()} [${args}] => ${error}`);
		bot.echo(`Hmm. That didn't work. Try that \`${command}\` again.`, message);
	}
};