exports.properties = {
  name: 'about',
  aliases: ['a'],
  description: 'A small introduction.',
  usage: 'synus about'
};

exports.execute = (args, message, bot) => {
  let output = '';
  
  // Output builder
  output += 'Hello there! ';
  output += `My name is \`Synus\`${bot.emojis.resolve('544618533493932032').toString()} \n\n`;
  output += 'That\'s short for `systematically yielded, natively unobstrusive sidekick` \n';
  output += 'I\'m a multi-purpose Discord bot, ready to help with all kinds of stuff! \n\n';
  output += 'Type `synus help` to get started.';
  bot.say(output, message);
};
