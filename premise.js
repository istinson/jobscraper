var jobWatcher = require('./jobWatcher');

function premiseEval() {
	var items = Array.from(document.getElementsByClassName("opening"));
	return items.map(function(item) {
		return {
			department: item.getAttribute('department_id'),
			title: item.innerText,
			link: item.firstElementChild.getAttribute('href')
		};
	});
}

function premiseQuality(item) {
	if (item.department === "14227") {
		return true;
	}
}

function premiseParser(item) {
	return {
		title: item.title.slice(0, item.title.indexOf('\n') - 1),
		loc: item.title.slice(item.title.indexOf('\n') + 1),
		link: item.link,
		id: `premise${item.link.slice(item.link.indexOf('=') + 1)}`
	};
}

jobWatcher.watch('https://boards.greenhouse.io/embed/job_board?for=premise&b=https://www.premise.com/openings/',
  premiseEval, premiseQuality, premiseParser, './premise.json');