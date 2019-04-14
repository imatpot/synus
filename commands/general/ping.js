exports.properties = {
    name: 'ping',
    aliases: [],
    description: 'Oh, a notification!',
    usage: 'synus ping'
};

exports.execute = async (args, message, bot) => {let pongResult = '';
    let pong = await bot.echo('`Pinging...`', message);

    pongResult += `${bot.emojis.get('565320633471467525').toString()}  `;
    pongResult += `\`Bot latency: ${pong.createdTimestamp - message.createdTimestamp}ms\`  `;
    pongResult += `\`API latency: ${Math.round(bot.ping)}ms\`  `;

    pong.edit(pongResult);
};
