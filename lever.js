var Nightmare = require('nightmare');
var vo = require('vo');
var _ = require('underscore');
var fs = require('fs')
vo(function* () {
	var nightmare = Nightmare({ show: true });
	var link = yield nightmare
	.goto('https://www.lever.co/jobs')
	.wait()
	.evaluate(function () {
		var items = Array.from(document.getElementsByClassName('Engineering'));
		return items.map(function(item) {
			return {
				title: item.innerText,
				link: item.firstChild.getAttribute('href')
		  };
		});
	})
	yield nightmare.end();
	return link;
})(function (err, result) {
	if (err) return console.log(err);
	var job = [];
	_.each(result, function(item) {
		if(item.link) {
	 		job.push({
			  id: 'lever' + item.link.slice(item.link.indexOf('/lever/') + 7),
			  title: item.title.slice(0, item.title.indexOf('\n')),
			  link: item.link,
			  loc: item.title.slice(item.title.indexOf('\n') + 1, item.title.indexOf('Full-time') - 1 || item.title.length)
		  });
	 	}
	});
	fs.writeFile('./lever.json', JSON.stringify(job, null, '\  '));
});