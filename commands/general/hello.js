const fs = require('fs');
const path = require('path');

const greetings = JSON.parse(fs.readFileSync(path.resolve('./data/greetings.json'))).greetings;

exports.properties = {
  name: 'hello',
  aliases: ['All of Sinus\' repsonses to this. Try it out!'],
  description: 'Say hello!',
  usage: 'synus hello'
};

exports.execute = (args, message, bot) => {
  bot.say(greetings[getRandomInt(greetings.length)], message);
};

exports.getGreetingsNoFlag = () => {
  let arr = [];
  greetings.forEach((greeting) => {
    greeting = greeting.split(/ +/g);
    greeting.shift();
    arr.push(greeting.shift().toLowerCase());
  });
  return arr;
};

exports.getGreeting = () => {
  let greeting = '';
  greeting = greetings[getRandomInt(greetings.length)].split(/ +/g);
  greeting.shift();
  return greeting.join(' ');
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
