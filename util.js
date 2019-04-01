const { prefixes } = require('./config.json');

module.exports = {
	'makeCodeBlock': (s) => {
		return '```' + s + '```';
	},
	'isBotPrefix': (s) => {
		let is = false;
		prefixes.forEach(p => {
			if (p === s) is = true;
		});
		return is;
	},
};