require('dotenv').config();

const echo = require('./echo.js').execute;
const print = require('./print.js').execute;
const fs = require('fs');
const path = require('path');
const prefixes = process.env.BOT_PREFIXES.split(',');

module.exports.properties = {
    name: 'help',
    aliases: ['h'],
    description: 'Shows a list of commands.',
    usage: 'synus help',
}

module.exports.execute = (message, args, bot) => {
    let categoryTree = {};
    const commandsDirectory = path.resolve('./commands');

    let categories = fs.readdirSync(commandsDirectory).filter((dir) => {
        return fs.lstatSync(path.join(commandsDirectory, dir)).isDirectory();
    });

    categories.forEach((category) => {
        categoryTree[category] = [];
        const categoryDirectory = path.resolve(path.join(commandsDirectory, category));

        const files = fs.readdirSync(categoryDirectory).filter((file) => {
            return file.endsWith('.js');
        });

        files.forEach((file) => {
            let command = require(`../${category}/${file}`);
            categoryTree[category].push({
                name: command.properties.name,
                aliases: command.properties.aliases,
                description: command.properties.description,
                usage: command.properties.usage,
            });
        });
    });

    if (args.length === 0) {
        let spaces = '';
        let requiredNameLength = 'Prefixes'.length + 3;

        for (let cat in categoryTree) {
            categoryTree[cat].forEach((cmd) => {
                if (cmd.name.length + 3 > requiredNameLength) requiredNameLength = cmd.name.length + 3;
            });
        }

        for (let i = requiredNameLength; i > 'Prefixes'.length; i--) { spaces += ' '; }
        print(message, 'Prefixes' + spaces + prefixes.join(', '));

        for (let cat in categoryTree) {
            let output = '';

            output += cat.toUpperCase() + '\n\n';
            categoryTree[cat].forEach((cmd) => {
                spaces = '';
                for (let i = requiredNameLength; i > cmd.name.length; i--) {
                    spaces += ' ';
                }
                output += cmd.name + spaces + cmd.description + '\n';
            });

            print(message, output);
        }

        spaces = '';
        for (let i = requiredNameLength; i > 'Tip'.length; i--) { spaces += ' '; }
        print(message, 'Tip' + spaces + 'For details, type synus help [command]')
    }
    else {
        const request = args.shift();
        let command = {};
        let category = '';
        let output = '';

        for (let cat in categoryTree) {
            categoryTree[cat].forEach((cmd) => {
                if (cmd.name === request || cmd.aliases.includes(request)) {
                    category = cat;
                    command = cmd;
                };
            });
        }

        if (category === '' || command === {}) {
            echo(message, `Command \`${request}\` doesn't exist.`);
            return;
        }

        output += command.name + '\n\n';
        output += 'Category:     ' + category.charAt(0).toUpperCase() + category.slice(1) + '\n';
        if (command.aliases.length !== 0) output += 'Aliases:      ' + command.aliases.join(', ') + '\n';
        output += 'Description:  ' + command.description + '\n\n';
        output += 'Usage:        ' + command.usage;

        print(message, output);
    }
}
