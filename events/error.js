module.exports = (bot, error) => {
  bot.console.error(`Discord.js has thrown an error: \n\n${JSON.stringify(error)}`);
};