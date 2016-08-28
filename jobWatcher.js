var Nightmare = require('nightmare');
var vo = require('vo');
var _ = require('underscore');
var fs = require('fs');

var JobWatcher = function() {};

JobWatcher.prototype.jobParser = function(result, formatting) {
	var jobs = [];
	_.each(result, function (item) {
		if (item.link) {
			jobs.push(formatting(item));
		}
	});
	return jobs;
};

JobWatcher.prototype.watch = function(careerUrl, jobEval, formatting, filePath) {
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
		fs.writeFile(filePath, JSON.stringify(JobWatcher.prototype.jobParser(result, formatting), null, '\  '));
	});
};

module.exports = new JobWatcher();