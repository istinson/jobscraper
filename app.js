const mongoose = require('mongoose');
const config = require('./config');
const Jobs = require('./models/jobModel');
mongoose.connect(config.getDbConnectionString());

require('./scripts/twitch')
  .then(function(results) {
	  results.forEach((job, index, arr) => {
	  	Jobs.findByIdAndUpdate(job._id, job, {upsert: true, setDefaultsOnInsert: true}, function (err, doc) {
	  		if (err) {
	  			throw err;
	  		} else if (index === arr.length - 1 && doc){
				  mongoose.disconnect();
	  		}
	  	});
	  });
  })
  .catch(function(error) {
	  throw error;
  });