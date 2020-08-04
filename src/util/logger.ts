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

/**
 * Provides a series of static functions to verbosely log things to the console.
 */
export class Logger {
  /**
   * Logs a string to the console including a timestamp and type.
   *
   * @param content text to be logged
   * @param type optional type of log
   */
  public static log(content: any, type: LogType = LogType.LOG): void {
    const timestamp = `[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}]`;

    switch (type) {
      case LogType.LOG:
        console.log(gray(`${timestamp} [${type}] ${content}`));
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

  /**
   * Logs an error to the console including a timestamp.
   *
   * @param content string to be logged
   */
  public static error(content: any): void {
    this.log(content, LogType.ERROR);
  }

  /**
   * Logs a command invocation to the console including a timestamp.
   *
   * @param content string to be logged
   */
  public static command(content: any): void {
    this.log(content, LogType.COMMAND);
  }

  /**
   * Logs a warning to the console including a timestamp.
   *
   * @param content string to be logged
   */
  public static warn(content: any): void {
    this.log(content, LogType.WARNING);
  }

  /**
   * Logs a debug value to the console including a timestamp.
   *
   * @param content string to be logged
   */
  public static debug(content: any): void {
    this.log(content, LogType.DEBUG);
  }

  /**
   * Logs a notification to the console including a timestamp.
   *
   * @param content string to be logged
   */
  public static notify(content: any): void {
    this.log(content, LogType.NOTIFICATION);
  }

  /**
   * Logs a newline character (`\n`) to the console.
   *
   * @param content string to be logged
   */
  public static newLine(content: any): void {
    this.log(content, LogType.NEWLINE);
  }
}
