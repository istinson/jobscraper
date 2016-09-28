var jobWatcher = require('./../jobWatcher');
const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(config.getDbConnectionString());

function ottoEval() {
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

function ottoFilter(item) {
  if (item.department === 'SOFTWARE ENGINEERING') {
	  return true;
  }
}

function ottoParser(item) {
	return {
		_id: `otto${item.link.slice(item.link.indexOf('otto/') + 5)}`,
		title: item.title,
		loc: item.loc,
		link: item.link
	}
}

jobWatcher.watch('https://jobs.lever.co/otto/', ottoEval, ottoFilter, ottoParser);