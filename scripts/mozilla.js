var jobWatcher = require('./../jobWatcher');
const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(config.getDbConnectionString());

function mozillaEval() {
  var items = Array.from(document.getElementsByClassName('position'));
	return items.map(function(item) {
		return {
			title: item.firstElementChild.firstElementChild.innerText,
			link: item.firstElementChild.firstElementChild.getAttribute('href'),
			department: item.getAttribute('data-team'),
			loc: item.firstElementChild.nextElementSibling.innerText
		};
	});
}

function mozillaFilter(item) {
	if (item.department === 'Engineering,'
		&& (item.loc.indexOf('Mountain View') > -1
		|| item.loc.indexOf('San Francisco') > -1)) {
		return true;
	}
}

function mozillaParser(item) {
  return {
	  _id: `mozilla${item.link.slice(item.link.indexOf('gh/') + 3)}`,
	  title: item.title,
	  link: `https://careers.mozilla.org${item.link}`,
	  loc: item.loc
  }
}

jobWatcher.watch('https://careers.mozilla.org/listings/', mozillaEval, mozillaFilter, mozillaParser);