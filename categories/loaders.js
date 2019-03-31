const util = require('../util.js');

module.exports = {
	'commands': {
		'load': {
			'desc': 'Load command category.',
			'func': (channel, categoryName, categories) => {
				categories[categoryName] = require(`./${categoryName}.js`).commands;
				channel.send(util.makeCodeBlock(`Loaded ${categoryName}.js`));
				return categories;
			},
		},
		'unload': {
			'desc': 'Unload command category.',
			'func': (channel, categoryName, categories) => {
				categories[categoryName] = null;
				channel.send(`Unloaded ${categoryName}.js`);
				return categories;
			},
		},
	},
};
