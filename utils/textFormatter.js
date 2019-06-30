exports.italic = (string) => `*${string}*`;
exports.bold = (string) => `**${string}**`;
exports.boldItalic = (string) => `***${string}***`;
exports.underlined = (string) => `__${string}__`;
exports.strikethrough = (string) => `~~${string}~~`;
exports.spoiler = (string) => `|| ${string} ||`;
exports.monospace = (string) => '`' + string + '`';
exports.codeBlock = (string, type = '') => '```' + type + '\n' + string + '\n```';
