module.exports = (bot, error) => {
    bot.logger.error(`Discord.js has thrown an error: \n\n${JSON.stringify(error)}`);
};