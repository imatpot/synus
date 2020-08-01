exports.properties = {
  name: 'ping',
  aliases: [],
  description: 'Pings the bot and measures the latencies.',
  usage: 'synus ping'
};

exports.execute = async (args, message, bot) => {
  let output = '';
  let pong = await bot.say('`Pinging...`', message);

  const synusLatency = `${pong.createdTimestamp - message.createdTimestamp}ms`;
  const discordApiLatency = `${Math.round(bot.ws.ping)}ms`;

  // Output builder
  output += `${bot.emojis.resolve('565320633471467525').toString()}  `;
  output += `\`Synus latency: ${synusLatency}\`  `;
  output += `\`DiscordJS API latency: ${discordApiLatency}\`  `;

  pong.edit(output);
  
  bot.console.log(`Synus latency:          ${synusLatency}`);
  bot.console.log(`DiscordJS API latency:  ${discordApiLatency}`);
};
