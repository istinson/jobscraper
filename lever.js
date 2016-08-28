var jobWatcher = require('./jobWatcher.js');

function leverFormat(item) {
	return {
		id: 'lever' + item.link.slice(item.link.indexOf('/lever/') + 7),
		title: item.title.slice(0, item.title.indexOf('\n')),
		link: item.link,
		loc: item.title.slice(item.title.indexOf('\n') + 1, item.title.indexOf('Full-time') - 1 || item.title.length)
	};
}

function leverEval() {
	var items = Array.from(document.getElementsByClassName('Engineering'));
	return items.map(function (item) {
		return {
			title: item.innerText,
			link: item.firstChild.getAttribute('href')
		};
	});
}

jobWatcher.watch('https://www.lever.co/jobs', leverEval, leverFormat, './lever.json');