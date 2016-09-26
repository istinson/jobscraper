// https://www.npmjs.com/package/vo   FACTOR OUT VO
// https://www.npmjs.com/package/nightmare-examples#documentation EXAMPLES
const Nightmare = require('nightmare');
const vo = require('vo');
const _ = require('underscore');
const Jobs = require('./models/jobModel');

const JobWatcher = function() {};

JobWatcher.prototype.jobParser = function(result, quality, parsing) {
	return _.map(_.filter(result, function (item) {
		return quality(item);
	}), function (item) {
		return parsing(item);
	});
};

JobWatcher.prototype.watch = function(careerUrl, jobEval, filtering, parsing) {
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
		JobWatcher.prototype.jobParser(result, filtering, parsing).forEach(job => {
			Jobs.findByIdAndUpdate(job._id, job, {upsert: true, setDefaultsOnInsert: true}, function (err, doc) {
				if (err) console.log('error', err);
				console.log("succesfully saved", doc);
			});
		});
	});
};

module.exports = new JobWatcher();