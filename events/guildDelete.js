module.exports = (bot, guild) => {
	bot.logger.notify(`[GUILD LEAVE] ${bot.user.tag} was removed from ${guild.name} (${guild.id})`);
};
