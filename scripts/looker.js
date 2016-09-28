var jobWatcher = require('./../jobWatcher');
const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(config.getDbConnectionString());

function lookerEval() {
	var items = Array.from(document.getElementsByClassName('posting-title'));
	return items.map(function(item) {
		return {
			title: item.firstChild.innerText,
			link: item.getAttribute('href'),
			department: item.lastChild.firstChild.nextSibling.innerText,
			loc: item.lastChild.firstChild.innerText
		}
	});
}

function lookerFilter(item) {
	if (item.department === 'ENGINEERING') {
		return true;
	}
}

function lookerParser(item) {
	return {
		title: item.title,
		loc: item.loc,
		link: item.link,
		_id: `looker${item.link.slice(item.link.indexOf('looker/') + 7)}`
	}
}

jobWatcher.watch('https://jobs.lever.co/looker/', lookerEval, lookerFilter, lookerParser);