const echo = require('./echo.js').execute;
const echoCode = require('./print.js').execute;
const fs = require('fs');
const path = require('path');

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
        for (let cat in categoryTree) {
            let output = '';
            let spaces = '';

            output += cat.toUpperCase() + '\n\n';

            let requiredNameLength = 3;
            categoryTree[cat].forEach((cmd) => {
                if (cmd.name.length + 3 > requiredNameLength) requiredNameLength = cmd.name.length + 3;
            });

            categoryTree[cat].forEach((cmd) => {
                spaces = '';
                for (let i = requiredNameLength; i > cmd.name.length; i--) {
                    spaces += ' ';
                }
                output += cmd.name + spaces + cmd.description + '\n';
            });

            echoCode(message, output);
        }
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

        if (command === {}) {
            echo(message, `Command \`${request}\` doesn't exist.`);
            return;
        }

        output += command.name + '\n\n';
        output += 'Category:     ' + category.charAt(0).toUpperCase() + category.slice(1) + '\n';
        if (command.aliases.length !== 0) output += 'Aliases:      ' + command.aliases.join(', ') + '\n';
        output += '\n';
        output += 'Description:  ' + command.description + '\n\n';
        output += 'Usage:        ' + command.usage;

        echoCode(message, output);
    }
}
