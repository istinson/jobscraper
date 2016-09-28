var jobWatcher = require('./../jobWatcher');
const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(config.getDbConnectionString());

function slackEval() {
	var items = Array.from(document.getElementsByTagName('h4'));
	return items.map(function (item) {
		return {
			title: item.innerText,
			link: `https://slack.com${item.parentNode.getAttribute('href')}`,
			loc: item.parentNode.parentNode.getAttribute('data-location'),
			department: item.parentNode.parentNode.parentNode.parentNode.firstElementChild.getAttribute('id')
		};
	});
}

function slackFilter(item) {
	if (item.department === 'engineering' && item.loc.indexOf('San Francisco') > -1) {
		return true;
	}
}

function slackParser(item) {
	return {
		_id: `slack${item.link.slice(23, 29)}`,
		title: item.title,
		link: item.link,
		loc: item.loc
	};
}

jobWatcher.watch('https://slack.com/jobs/dept/engineering', slackEval, slackFilter, slackParser);