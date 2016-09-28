var jobWatcher = require('./../jobWatcher');
const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(config.getDbConnectionString());

function githubEval() {
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

function githubFilter(item) {
	if (item.department === 'ENGINEERING') {
		return true;
	}
}

function githubParser(item) {
	return {
		title: item.title,
		loc: item.loc,
		link: item.link,
		_id: `github${item.link.slice(item.link.indexOf('github/') + 7)}`
	}
}

jobWatcher.watch('https://jobs.lever.co/github/', githubEval, githubFilter, githubParser);