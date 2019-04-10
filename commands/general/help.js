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

module.exports.execute = (args, message, bot) => {
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
        let requiredNameLength = 'prefixes'.length + 3;

        for (let cat in categoryTree) {
            categoryTree[cat].forEach((cmd) => {
                if (cmd.name.length + 3 > requiredNameLength) requiredNameLength = cmd.name.length + 3;
            });
        }

        for (let i = requiredNameLength; i > 'prefixes'.length; i--) { spaces += ' '; }
        print('PREFIXES' + spaces + prefixes.join(', '), message);

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

            print(output, message);
        }

        spaces = '';
        for (let i = requiredNameLength; i > 'tip'.length; i--) { spaces += ' '; }
        print('TIP' + spaces + 'For details, type synus help [command]', message)
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
            echo(`Command \`${request}\` doesn't exist.`, message);
            return;
        }

        output += command.name.toUpperCase() + '\n\n';
        output += 'Category:     ' + category.charAt(0).toUpperCase() + category.slice(1) + '\n';
        if (command.aliases.length !== 0) output += 'Aliases:      ' + command.aliases.splice(0, 9).join(', ') + '\n';
        output += 'Description:  ' + command.description + '\n\n';
        output += 'Usage:        ' + command.usage;

        print(output, message);
    }
}
