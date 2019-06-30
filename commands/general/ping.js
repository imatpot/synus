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
  const discordApiLatency = `${Math.round(bot.ping)}ms`;
  const firebaseLatency = 'N/A'; // TODO: Get Firebase latency once it's implemented

  // Output builder
  output += `${bot.emojis.get('565320633471467525').toString()}  `;
  output += `\`Synus latency: ${synusLatency}\`  `;
  output += `\`DiscordJS API latency: ${discordApiLatency}\`  `;
  output += `\`Firebase latency: ${firebaseLatency}\`  `;

  pong.edit(output);
  
  bot.console.log(`Synus latency:          ${synusLatency}`);
  bot.console.log(`DiscordJS API latency:  ${discordApiLatency}`);
  bot.console.log(`Firebase latency:       ${firebaseLatency}`);
};
