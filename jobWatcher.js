var Nightmare = require('nightmare');
var vo = require('vo');
var _ = require('underscore');
var fs = require('fs');

var JobWatcher = function() {};

JobWatcher.prototype.jobParser = function(result, quality, parsing) {
	return _.map(_.filter(result, function(item) {
		return quality(item);
	}), function(item) {
		return parsing(item);
	});
};

JobWatcher.prototype.watch = function(careerUrl, jobEval, filtering, parsing, filePath) {
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
		fs.writeFile(filePath, JSON.stringify(JobWatcher.prototype.jobParser(result, filtering, parsing), null, '\  '));
	});
};

module.exports = new JobWatcher();