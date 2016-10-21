const Nightmare = require('nightmare');
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
	var nightmare = Nightmare({show: true});
	nightmare
	  .goto(careerUrl)
		.wait()
		.evaluate(jobEval)
		.end()
		.then(function (result) {
			JobWatcher.prototype.jobParser(result, filtering, parsing).forEach(job => {
				Jobs.findByIdAndUpdate(job._id, job, {upsert: true, setDefaultsOnInsert: true}, function (err, doc) {
					if (err) {
						throw err;
					} else {
						console.log("succesfully saved", doc);
					}
				});
			});
		})
		.catch(function (err) {
			throw err;
		});
};

module.exports = new JobWatcher();