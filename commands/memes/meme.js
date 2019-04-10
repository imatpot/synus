const echo = require('../general/echo.js').execute;
const print = require('../general/print.js').execute;
const fetch = require('node-fetch');

module.exports.properties = {
    name: 'meme',
    aliases: ['meem', 'r/memes'],
    description: 'Fetches the latest meme from r/memes',
    usage: 'synus meme',
}

module.exports.execute = (message, args, bot) => {
    fetch('https://api.reddit.com/r/memes/new.json?sort=new&limit=1')
        .then(response => response.json())
        .then(response => {
            echo(message, 'Here\'s the latest meme from r/memes\n' + response.data.children[0].data.url);
        });
}
