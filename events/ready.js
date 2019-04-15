module.exports = (bot) => {
    bot.logger.notify(`[READY] ${bot.user.tag} booted successfully`);
	bot.user.setPresence({
		game: {
			name: 'hide and seek with bugs',
			type: 'STREAMING',
			url: 'https://www.twitch.tv/quonnz'
		}
	});
};