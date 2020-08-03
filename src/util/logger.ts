import { blue, gray, green, magenta, red, yellow } from 'chalk';
import { format } from 'date-fns';

enum LogType {
  LOG = 'LOG',
  ERROR = 'ERROR',
  COMMAND = 'COMMAND',
  WARNING = 'WARNING',
  DEBUG = 'DEBUG',
  NOTIFICATION = 'NOTIFICATION',
  NEWLINE = 'NEWLINE',
}

export class Logger {
  public static log(content: any, type: LogType = LogType.LOG): void {
    const timestamp = `[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}]`;

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

  public static error(content: any): void {
    this.log(content, LogType.ERROR);
  }

  public static command(content: any): void {
    this.log(content, LogType.COMMAND);
  }

  public static warn(content: any): void {
    this.log(content, LogType.WARNING);
  }

  public static debug(content: any): void {
    this.log(content, LogType.DEBUG);
  }

  public static notify(content: any): void {
    this.log(content, LogType.NOTIFICATION);
  }

  public static newLine(content: any): void {
    this.log(content, LogType.NEWLINE);
  }
}
