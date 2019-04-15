exports.properties = {
    name: 'ping',
    aliases: [],
    description: 'Oh, a notification!',
    usage: 'synus ping'
};

exports.execute = async (args, message, bot) => {
    let output = '';
    let pong = await bot.echo('`Oh, a notification...`', message);

    // Output builder
    output += `${bot.emojis.get('565320633471467525').toString()}  `;
    output += `\`Bot latency: ${pong.createdTimestamp - message.createdTimestamp}ms\`  `;
    output += `\`API latency: ${Math.round(bot.ping)}ms\`  `;

    pong.edit(output);
};
