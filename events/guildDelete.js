module.exports = (bot, guild) => {
  bot.console.notify(`[GUILD LEAVE] ${bot.user.tag} was removed from ${guild.name} (${guild.id})`);
};
