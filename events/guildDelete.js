module.exports = (bot, guild) => {
	bot.logger.notify(`[GUILD LEAVE] ${guild.name} (${guild.id}) removed the bot.`);
};
