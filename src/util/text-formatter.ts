export class TextFormatter {
  public static italic(content: string): string {
    return `*${content}*`;
  }

  public static bold(content: string): string {
    return `**${content}**`;
  }

  public static boldItalic(content: string): string {
    return `***${content}***`;
  }

  public static underlined(content: string): string {
    return `__${content}__`;
  }

  public static strikethrough(content: string): string {
    return `~~${content}~~`;
  }

  public static spoiler(content: string): string {
    return `|| ${content} ||`;
  }

  public static monospace(content: string): string {
    return '`' + content + '`';
  }

  public static codeBlock(content: string, type: string = ''): string {
    return '```' + type + '\n' + content + '\n```';
  }

  public static noEmbedLink(content: string): string {
    return `<${content}>`;
  }
}
