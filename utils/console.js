const chalk = require('chalk');
const moment = require('moment');

exports.log = (content, type = 'log') => {
  const timestamp = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]`;

  switch (type) {
    case 'log': console.log(`${chalk.gray(`${timestamp} [${type.toUpperCase()}] ${content}`)}`); break;

    case 'error': console.log(`\n${timestamp} ${chalk.red(`[${type.toUpperCase()}]`)} ${content}\n`); break;

    case 'command': console.log(`${timestamp} ${chalk.blue(`[${type.toUpperCase()}]`)} ${content}`); break;

    case 'warning': console.log(`${timestamp} ${chalk.yellow(`[${type.toUpperCase()}]`)} ${content}`); break;

    case 'debug': console.log(`${timestamp} ${chalk.magenta(`[${type.toUpperCase()}]`)} ${content}`); break;

    case 'notification': console.log(`\n${timestamp} ${chalk.green(`[${type.toUpperCase()}]`)} ${content}\n`); break;
    
    case 'newLine': console.log('\n'); break;

    default: {
      throw new TypeError('Logger type must be element of [ log, error, command, warning, debug, notification ]');
    }
  }
};

// Easy access
exports.error = (...args) => this.log(...args, 'error');
exports.command = (...args) => this.log(...args, 'command');
exports.warn = (...args) => this.log(...args, 'warning');
exports.debug = (...args) => this.log(...args, 'debug');
exports.notify = (...args) => this.log(...args, 'notification');
