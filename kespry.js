var jobWatcher = require('./jobWatcher');

function kespryEval() {
	var items = Array.from(document.getElementsByClassName('opening'));
	return items.map(function(item) {
		return {
			department: item.getAttribute('department_id'),
			title: item.innerText,
			link: item.firstElementChild.getAttribute('href'),
			loc: item.lastElementChild.innerText
		}
	});
}

function kespryFilter(item) {
	if (item.department === "4165") {
		return true
	}
}

function kespryParser(item) {
	return {
		title: item.title.slice(0, item.title.indexOf('\n') - 1),
		loc: item.title.slice(item.title.indexOf('\n') + 1),
		link: `https://boards.greenhouse.io${item.link}`,
		id: `kespry${item.link.slice(item.link.indexOf('jobs/') + 5)}`
	}
}

jobWatcher.watch('https://boards.greenhouse.io/kespryinc/', kespryEval, kespryFilter, kespryParser, './kespry.json');