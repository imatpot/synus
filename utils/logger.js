const chalk = require('chalk');
const moment = require('moment');

exports.log = (content, type = 'log') => {
    const timestamp = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]`;
    switch (type) {
        case 'log': {
            return console.log(`${chalk.gray(`${timestamp} [${type.toUpperCase()}] ${content}`)}`);
        }
        case 'error': {
            return console.log(`\n${timestamp} ${chalk.red(`[${type.toUpperCase()}]`)} ${content}\n`);
        }
        case 'command': {
            return console.log(`${timestamp} ${chalk.blue(`[${type.toUpperCase()}]`)} ${content}`);
        }
        case 'warn': {
            return console.log(`${timestamp} ${chalk.yellow(`[${type.toUpperCase()}]`)} ${content}`);
        }
        case 'debug': {
            return console.log(`${timestamp} ${chalk.magenta(`[${type.toUpperCase()}]`)} ${content}`);
        }
        case 'notification': {
            return console.log(`\n${timestamp} ${chalk.green(`[${type.toUpperCase()}]`)} ${content}\n`);
        }
        default: {
            throw new TypeError('Logger type must be element of [log, error, command, warn, debug, notification]');
        }
    }
};

// Easier access
exports.error = (...args) => this.log(...args, 'error');
exports.command = (...args) => this.log(...args, 'command');
exports.warn = (...args) => this.log(...args, 'warn');
exports.debug = (...args) => this.log(...args, 'debug');
exports.notify = (...args) => this.log(...args, 'notification');
