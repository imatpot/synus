const Discord = require('discord.js');
const fetch = require('node-fetch');

exports.properties = {
  name: 'meme',
  aliases: ['meem', 'mem'],
  description: 'Let me fetch the newest lit meme from any subreddit. Default is r/memes.',
  usage: 'synus meme [subreddit=memes]'
};

exports.execute = async (args, message, bot) => {
  // For the people who try to invoke with r/subreddit
  const subreddit = (args[0] === undefined) ? 'memes' : args[0].replace(/r\//g, '');

  let post = {};
  let user = {};
  let sub = {};

  let stop = false;

  await fetch(`https://api.reddit.com/r/${subreddit}/new.json?sort=new&limit=1`)
    .then((postResponse) => postResponse.json())
    .then((postResponseJson) => {
      if (postResponseJson.data.children[0] === undefined) {
        bot.say(`Sorry, the subreddit \`r/${subreddit}\` has restricted access or doesn't exist.`, message);
        stop = true; // Can't return from a .then() so I use a boolean
      } else {
        post = postResponseJson.data.children[0].data;
        bot.console.log(`Fetched post from r/${subreddit}`);
      }
    });

  if (stop) return;

  await fetch(`https://api.reddit.com/user/${post.author}/about.json`)
    .then((userResponse) => userResponse.json())
    .then((userResponseJson) => user = userResponseJson.data);

  bot.console.log(`Fetched u/${post.author}`);

  await fetch(`https://api.reddit.com/r/${subreddit}/about.json`)
    .then((subredditResponse) => subredditResponse.json())
    .then((subredditResponseJson) => sub = subredditResponseJson.data);
    
  bot.console.log(`Fetched details of r/${subreddit}`);

  const embed = new Discord.MessageEmbed();

  bot.console.log(`Building meme embed`);

  embed.setColor('#FF4500');
  embed.setTitle(post.title);
  embed.setURL('https://www.reddit.com' + post.permalink);

  // Catch deleted users
  post.author === '[deleted]'
    ? embed.setAuthor('u/[deleted]', '', 'https://www.reddit.com')
    : embed.setAuthor(`u/${user.name}`, user.icon_img.split('?')[0], `https://www.reddit.com/user/${user.name}`);

  // Catch NSFW content
  if (post.over_18) {
    embed.addField('This post is NSFW', 'I hid it for you, just in case.', true);
  } else {
    embed.setDescription(post.selftext);
    embed.setImage(post.url);
  }

  embed.setTimestamp(post.created_utc * 1000);
  embed.setFooter(post.subreddit_name_prefixed, sub.icon_img);

  bot.say(embed, message);
  bot.console.log(`Posted meme embed`);
};
