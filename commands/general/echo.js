exports.properties = {
  name: 'echo',
  aliases: ['e'],
  description: 'Wow, such a big cave!',
  usage: 'synus echo [text]'
};

exports.execute = (args, message, bot) => {
  const content = Array.isArray(args) ? args.join(' ') : args;
  return message.channel.send(content);
};
