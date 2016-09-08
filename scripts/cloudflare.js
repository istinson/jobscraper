var jobWatcher = require('./../jobWatcher');

function cloudFlareEval() {
	var items = Array.from(document.getElementsByClassName('js-job-container'));
	return items.map(function(item) {
		return {
			title: item.firstElementChild.firstElementChild.firstElementChild.innerText,
			loc: item.firstElementChild.lastElementChild.innerText,
			link: item.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute('href'),
			department: item.parentNode.firstElementChild.firstElementChild.firstElementChild.innerText
		};
	});
}

function cloudFlareFilter(item) {
  if (item.loc === 'SAN FRANCISCO, CA' && item.department === 'ENGINEERING') {
	  return true;
  }
}

function cloudFlareParser(item) {
	return {
		id: `cloudflare${item.link.slice(-22)}`,
		title: item.title,
		loc: item.loc,
		link: `https://careers.jobscore.com${item.link}`
	}
}

jobWatcher.watch('https://careers.jobscore.com/careers/cloudflare', cloudFlareEval, cloudFlareFilter, cloudFlareParser, './json/cloudFlare.json');
