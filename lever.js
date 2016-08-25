var Nightmare = require('nightmare');
var vo = require('vo');
var _ = require('underscore');
var fs = require('fs')
vo(function* () {
	var nightmare = Nightmare({ show: true });
	var link = yield nightmare
	.goto('https://www.lever.co/jobs')
	.wait()
	.wait(1000)
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
	console.log(result);
	// var job = [];
	// _.each(result, function(item) {
	// 	if(item.txsegment.source_string.indexOf('Engineer') > -1) {
	// 		job.push({id: item.txsegment.key, title: item.txsegment.source_string});
	// 	}
	// });
	// fs.writeFile('./ripple.json', JSON.stringify(job, null, '\  '));
});