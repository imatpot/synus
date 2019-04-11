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

module.exports.execute = (args, message, bot) => {
    let subreddit = (args[0] == null) ? 'memes' : args[0].replace(/r\//g, '');

    fetch(`https://api.reddit.com/r/${subreddit}/new.json?sort=new&limit=1`)
        .then((postResponse) => postResponse.json())
        .then((postResponse) => {
            const post = postResponse.data.children[0].data;
            fetch(`https://api.reddit.com/user/${post.author}/about.json`)
                .then((userResponse) => userResponse.json())
                .then((userResponse) => {
                    const author = userResponse.data;
                    fetch(`https://api.reddit.com/r/${subreddit}/about.json`)
                        .then((subredditResponse) => subredditResponse.json())
                        .then((subredditResponse) => {
                            const sub = subredditResponse.data;
                            const embed = new Discord.RichEmbed();

                            embed.setColor('#FF4500');
                            embed.setTitle(post.title);
                            embed.setURL('https://www.reddit.com' + post.permalink);
                            embed.setAuthor(`u/${author.name}`, author.icon_img.split('?')[0], `https://www.reddit.com/user/${author.name}`);
                            
                            if (post.over_18) embed.addField('This post is NSFW', 'I hid it for you, just in case.', true);
                            else embed.setImage(post.url);

                            embed.setTimestamp();
                            embed.setFooter(post.subreddit_name_prefixed, sub.icon_img);

                            echo(embed, message);
                        });
                });
        });
}
