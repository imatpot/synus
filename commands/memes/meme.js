const Discord = require('discord.js');

const echo = require('../general/echo.js').execute;
const fetch = require('node-fetch');
const formatter = require('../../util/text-formatter.js');

module.exports.properties = {
    name: 'meme',
    aliases: ['meem', 'mem'],
    description: 'Let me fetch the newest lit meme from any subreddit. Default is r/memes.',
    usage: 'synus meme [subreddit=memes]'
};

module.exports.execute = async (args, message, bot) => {
    // For the people who try to invoke with r/subreddit
    const subreddit = (args[0] === undefined) ? 'memes' : args[0].replace(/r\//g, '');
    let post = {};
    let user = {};
    let sub = {};
    let stop = false;

    await fetch(`https://api.reddit.com/r/${subreddit}/new.json?sort=new&limit=1`)
        .then((postResponse) => postResponse.json())
        .then((postResponse) => {
            if (postResponse.data.after === undefined) {
                echo(`Sorry, the subreddit \`r/${subreddit}\` has restricted access or doesn't exist.`, message);
                stop = true;
            }
            else {
                post = postResponse.data.children[0].data;
            }
        });

    if (stop) return;

    await fetch(`https://api.reddit.com/user/${post.author}/about.json`)
        .then((userResponse) => userResponse.json())
        .then((userResponse) => user = userResponse.data);

    await fetch(`https://api.reddit.com/r/${subreddit}/about.json`)
        .then((subredditResponse) => subredditResponse.json())
        .then((subredditResponse) => sub = subredditResponse.data);

    const embed = new Discord.RichEmbed();

    embed.setColor('#FF4500');
    embed.setTitle(post.title);
    embed.setURL('https://www.reddit.com' + post.permalink);

    // Catch deleted users
    if (post.author === '[deleted]')  embed.setAuthor('u/[deleted]', '', 'https://www.reddit.com');
    else embed.setAuthor(`u/${user.name}`, user.icon_img.split('?')[0], `https://www.reddit.com/user/${user.name}`);

    // Catch NSFW content
    if (post.over_18) {
        embed.addField('This post is NSFW', 'I hid it for you, just in case.', true);
    }
    else {
        embed.setDescription(post.selftext);
        embed.setImage(post.url);
    }

    embed.setTimestamp();
    embed.setFooter(post.subreddit_name_prefixed, sub.icon_img);

    echo(embed, message);
};
