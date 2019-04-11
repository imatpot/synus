const Discord = require('discord.js');

const echo = require('../general/echo.js').execute;
const print = require('../general/print.js').execute;
const fetch = require('node-fetch');

module.exports.properties = {
    name: 'meme',
    aliases: ['meem', 'mem'],
    description: 'Fetches the latest meme from a subreddit, default is r/memes.',
    usage: 'synus meme [subreddit=memes]',
}

module.exports.execute = async (args, message, bot) => {
    const subreddit = (args[0] == null) ? 'memes' : args[0].replace(/r\//g, '');
    let post = {};
    let user = {};
    let sub = {};
    let stop = false;

    await fetch(`https://api.reddit.com/r/${subreddit}/new.json?sort=new&limit=1`)
        .then((postResponse) => postResponse.json())
        .then((postResponse) => {
            if (postResponse.data.after == null) {
                echo(`Sorry, the subreddit \`r/${subreddit}\` has restricted access or doesn't exist.`, message);
                stop = true;
            }
            else {
                post = postResponse.data.children[0].data
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
    embed.setAuthor(`u/${user.name}`, user.icon_img.split('?')[0], `https://www.reddit.com/user/${user.name}`);

    if (post.over_18) embed.addField('This post is NSFW', 'I hid it for you, just in case.', true);
    else embed.setImage(post.url);

    embed.setTimestamp();
    embed.setFooter(post.subreddit_name_prefixed, sub.icon_img);

    echo(embed, message);
}
