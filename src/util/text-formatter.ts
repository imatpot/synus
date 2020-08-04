/**
 * Provides a series of static functions to format text in the Discord client.
 */
export class TextFormatter {
  /**
   * Displays a string as *italic*.
   * 
   * @param content string to be formatted
   */
  public static italic(content: string): string {
    return `*${content}*`;
  }

  /**
   * Displays a string as **bold**.
   * 
   * @param content string to be formatted
   */
  public static bold(content: string): string {
    return `**${content}**`;
  }

  /**
   * Displays a string as ***bold italic***.
   * 
   * @param content string to be formatted
   */
  public static boldItalic(content: string): string {
    return `***${content}***`;
  }

  /**
   * Displays a string as underlined.
   * 
   * @param content string to be formatted
   */
  public static underlined(content: string): string {
    return `__${content}__`;
  }

  /**
   * Displays a string as ~~striked through~~.
   * 
   * @param content string to be formatted
   */
  public static strikethrough(content: string): string {
    return `~~${content}~~`;
  }

  /**
   * Displays a string as a spoiler.
   * 
   * @param content string to be formatted
   */
  public static spoiler(content: string): string {
    return `|| ${content} ||`;
  }

  /**
   * Displays a string in `monospace`.
   * 
   * @param content string to be formatted
   */
  public static monospace(content: string): string {
    return '`' + content + '`';
  }

  /**
   * Displays a string in a
   * 
   * ```
   * code block including optional syntax highlighting.
   * ```
   * 
   * @param content string to be formatted
   * @param type optional syntax highlighting language identifier
   */
  public static codeBlock(content: string, type: string = ''): string {
    return '```' + type + '\n' + content + '\n```';
  }

  /**
   * Prevents a link from displaying an embed by wrapping it in `<>`.
   * 
   * @param content string to be formatted
   */
  public static noEmbedLink(content: string): string {
    return `<${content}>`;
  }
}
