const Nightmare = require('nightmare');
const _ = require('underscore');

const JobWatcher = function() {};

JobWatcher.prototype.jobParser = function(result, quality, parsing) {
	return _.map(_.filter(result, function (item) {
		return quality(item);
	}), function (item) {
		return parsing(item);
	});
};

JobWatcher.prototype.watch = function(careerUrl, jobEval, filtering, parsing) {
	return new Promise(function(resolve, reject) {
		var nightmare = Nightmare();
		nightmare
		.goto(careerUrl)
		.wait()
		.evaluate(jobEval)
		.end()
		.then(function (result) {
			let parsed = JobWatcher.prototype.jobParser(result, filtering, parsing);
			resolve(parsed);
		})
		.catch(function (err) {
			reject(err);
		});
	});
};

module.exports = new JobWatcher();