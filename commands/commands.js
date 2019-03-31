module.exports = {
	'commands': {
		'ping': {
			'desc': 'Pings Synus.',
			'func': (m) => {
				m.channel.send('Pong');
			},
		},
		'person-of-the-day': {
			'desc': 'Displays today\'s person of the day.',
			'func': (m) => {
				m.channel.send('Today\'s person is the day is <@' + m.author.id + '>');
			},
		},
	},
};