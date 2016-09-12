var jobWatcher = require('./../jobWatcher');

function twitchEval() {
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

function twitchFilter(item) {
	if (item.department === 'ENGINEERING' || item.title.indexOf('Engineer') > -1) {
		return true;
	}
}

function twitchParser(item) {
	return {
		title: item.title,
		department: item.department,
		loc: item.loc,
		link: item.link,
		id: `twitch${item.link.slice(item.link.indexOf('twitch/') + 7)}`
	}
}

jobWatcher.watch('https://jobs.lever.co/twitch', twitchEval, twitchFilter, twitchParser, './json/twitch.json');