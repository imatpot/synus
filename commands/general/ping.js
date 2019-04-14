exports.properties = {
    name: 'ping',
    aliases: [],
    description: 'Oh, a notification!',
    usage: 'synus ping'
};

exports.execute = (args, message, bot) => {
    // Make sure en emote with the ID 565320633471467525 is available in a server where Synus is a member of at all times
    bot.echo(`${bot.emojis.get('565320633471467525').toString()}  \`${Math.floor(bot.ping)}ms\``, message);
};
