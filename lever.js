var Nightmare = require('nightmare');
var vo = require('vo');
var _ = require('underscore');
var fs = require('fs');

function jobParser(result, formatting) {
	var jobs = [];
	_.each(result, function(item) {
		if (item.link) {
			jobs.push(formatting(item));
		}
	});
	return jobs;
}

function jobWatch(careerUrl, jobEval, formatting, filePath) {
	vo(function*() {
		var nightmare = Nightmare({show: true});
		var link = yield nightmare
		.goto(careerUrl)
		.wait()
		.evaluate(jobEval)
		yield nightmare.end();
		return link;
	})(function (err, result) {
		if (err) return console.log(err);
		fs.writeFile(filePath, JSON.stringify(jobParser(result, formatting), null, '\  '));
	});
}

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

jobWatch('https://www.lever.co/jobs', leverEval, leverFormat, './lever.json');