module.exports = (bot, guild) => {
  bot.logger.notify(`[GUILD JOIN] ${bot.user.tag} was added to ${guild.name} (${guild.id}). Guild owner: ${guild.owner.user.tag}`);
};
