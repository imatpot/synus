import { blue, gray, green, magenta, red, yellow } from 'chalk';
import moment, { Moment } from 'moment'; // TODO: Minimize import

enum LogType {
  LOG = 'LOG',
  ERROR = 'ERROR',
  COMMAND = 'COMMAND',
  WARNING = 'WARNING',
  DEBUG = 'DEBUG',
  NOTIFICATION = 'NOTIFICATION',
  NEWLINE = 'NEWLINE',
}

export default class Console {
  private moment: Moment = moment();

  public log(content: string, type: LogType = LogType.LOG): void {
    const timestamp = `[${this.moment.format('YYYY-MM-DD HH:mm:ss')}]`;

    switch (type) {
      case LogType.LOG:
        console.log(`${gray(`${timestamp} [${type}] ${content}`)}`);
        break;

      case LogType.ERROR:
        console.log(`\n${timestamp} ${red(`[${type}]`)} ${content}\n`);
        break;

      case LogType.COMMAND:
        console.log(`${timestamp} ${blue(`[${type}]`)} ${content}`);
        break;

      case LogType.WARNING:
        console.log(`${timestamp} ${yellow(`[${type}]`)} ${content}`);
        break;

      case LogType.DEBUG:
        console.log(`${timestamp} ${magenta(`[${type}]`)} ${content}`);
        break;

      case LogType.NOTIFICATION:
        console.log(`\n${timestamp} ${green(`[${type}]`)} ${content}\n`);
        break;

      case LogType.NEWLINE:
        console.log('\n');
        break;
    }
  }

  public error(content: string): void {
    this.log(content, LogType.ERROR);
  }

  public command(content: string): void {
    this.log(content, LogType.COMMAND);
  }

  public warn(content: string): void {
    this.log(content, LogType.WARNING);
  }

  public debug(content: string): void {
    this.log(content, LogType.DEBUG);
  }

  public notify(content: string): void {
    this.log(content, LogType.NOTIFICATION);
  }

  public newLine(content: string): void {
    this.log(content, LogType.NEWLINE);
  }
}
