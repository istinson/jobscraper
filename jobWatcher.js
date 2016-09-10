// https://www.npmjs.com/package/vo   FACTOR OUT VO
// https://www.npmjs.com/package/nightmare-examples#documentation EXAMPLES
var Nightmare = require('nightmare');
var vo = require('vo');
var _ = require('underscore');
var fs = require('fs');

var JobWatcher = function() {};

JobWatcher.prototype.jobParser = function(oldJobs, result, quality, parsing) {
	var jobsArray = JSON.parse(oldJobs);
	return _.uniq(jobsArray.concat(_.map(_.filter(result, function (item) {
		return quality(item);
	}), function (item) {
		return parsing(item);
	})), function(item) {
		return item.id;
	});
};

JobWatcher.prototype.watch = function(careerUrl, jobEval, filtering, parsing, filePath) {
	vo(function*() {
		var nightmare = Nightmare({show: true});
		var link = yield nightmare
		.goto(careerUrl)
		.wait()
		.evaluate(jobEval);
		yield nightmare.end();
		return link;
	})(function (err, result) {
		if (err) return console.log(err);
		var oldJobs = fs.readFileSync(filePath, {encoding: 'utf8'});
		fs.writeFile(filePath, JSON.stringify(JobWatcher.prototype.jobParser(oldJobs, result, filtering, parsing), null, '\  '));
	});
};

module.exports = new JobWatcher();