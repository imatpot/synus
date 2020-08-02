exports.properties = {
  name: 'abbreviate',
  aliases: ['abbr'],
  description: 'Abbreviate one of the previous messages.',
  usage: 'synus abbreviate [target=1]'
};

exports.execute = async (args, message, bot) => {
  let target = 1;

  // Check if target was set and if it's a proper integer
  if (args[0] !== undefined && Number.isInteger(parseInt(args[0]))) {
    target = parseInt(args[0]);
  }

  // Must fetch 1 more than target since invoking command is included
  target++;

  if (target <= 1) {
    message.channel.send('Sorry, I can\'t abbreviate that message.');
    return;
  }

  message.channel.messages.fetch({ limit: target }).then((messageMap) => {
    const messages = Array.from(messageMap.values());
    messages.sort((m) => m.createdTimestamp);

    const targetMessage = messages.pop().content;

    if (!targetMessage.trim()) {
      message.channel.send('Sorry, I can\'t abbreviate that message.');
      return;
    }

    const targetString = targetMessage;

    let abbreviation = '';

    // Split by spaces and remove empty entries
    const words = targetString.split(' ').filter((s) => s);
    words.forEach((word) => {
      abbreviation += word[0].toLowerCase();
    });

    message.channel.send(abbreviation);
  });
};
