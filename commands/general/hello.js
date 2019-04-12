const echo = require('../general/echo.js').execute;
const print = require('../general/print.js').execute;
const fs = require('fs');
const path = require('path');
const formatter = require('../../util/text-formatter.js');

const greetings = JSON.parse(fs.readFileSync(path.resolve('./data/greetings.json'))).greetings;

module.exports.properties = {
    name: 'hello',
    aliases: ['All of Sinus\' repsonses to this. Try it out!'],
    description: 'Say hello!',
    usage: 'synus hello',
}

module.exports.execute = (args, message, bot) => {
    echo(greetings[getRandomInt(greetings.length)], message);
}

module.exports.getGreetingsNoFlag = () => {
    let arr = [];
    greetings.forEach((greeting) => {
        greeting = greeting.split(/ +/g);
        greeting.shift();
        arr.push(greeting.shift().toLowerCase());
    });
    return arr;
}

module.exports.getGreeting = () => {
    let greeting = '';
    greeting = greetings[getRandomInt(greetings.length)].split(/ +/g);
    greeting.shift();
    return greeting.join(' ');
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
