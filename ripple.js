var Nightmare = require('nightmare');
var vo = require('vo');
var _ = require('underscore');
var fs = require('fs')
vo(function* () {
	var nightmare = Nightmare({ show: true });
	var link = yield nightmare
	.goto('https://ripple.com/company/careers/all-jobs/')
	.evaluate(function () {
		return document.getElementsByTagName('h5');
	});
	yield nightmare.end();
	return link;
})(function (err, result) {
	if (err) return console.log(err);
	var job = {};
	_.each(result, function(item) {
		job[item.txsegment.key] = item.txsegment.source_string;
	});
	fs.writeFile('./ripple.json', JSON.stringify(job, null, '\  '));
});


// var Xray = require('x-ray');
// var xray = new Xray();
// var fs = require('fs');
// var Nightmare = require('nightmare');
// new Nightmare()
//   .goto('https://ripple.com/company/careers/all-jobs/')
// 	.evaluate(function() {
// 		return document.querySelector('h5').innerText;
// 	}, function(job) {
// 		console.log(job);
// 	})
// 	.run();

// xray('https://ripple.com/company/careers/all-jobs/', '.job',
// 	[{
// 		//id: 'div@data-id',
// 		title: 'div@data-slug'
// 		//link: 'div@data-slug'
// 	}])
// (function(err, results) {
// 	// results = results.filter(function(item) {
// 	// 	if (item.title.indexOf("Engineer") > -1) {
// 	// 		return item;
// 	// 	}
// 	// });
// 	// results.forEach(function(item) {
// 	// 	item.id = 'ripple' + item.id;
// 	// 	item.link = 'https://ripple.com/company/careers/all-jobs/#' + item.link;
// 	// });
// 	if (err) throw err;
// 	fs.writeFile('./ripple.json', JSON.stringify(results, null, '\  '));
// });