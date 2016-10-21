const mongoose = require('mongoose');
const config = require('./config');
const Jobs = require('./models/jobModel');
mongoose.connect(config.getDbConnectionString());
// const os = require('os');

// const ripple = require('./scripts/ripple');
// const slack = require('./scripts/slack');
// const premise = require('./scripts/premise');
// const otto = require('./scripts/otto');
// const mozilla = require('./scripts/mozilla');
// const looker = require('./scripts/looker');
// const github = require('./scripts/github');
// const cloudflare = require('./scripts/cloudflare');
require('./scripts/twitch')
  .then(function(results) {
	  results.forEach((job, index, arr) => {
	  	Jobs.findByIdAndUpdate(job._id, job, {upsert: true, setDefaultsOnInsert: true}, function (err, doc) {
	  		if (err) {
	  			throw err;
	  		} else if (index === arr.length - 1){
	  			console.log("succesfully saved", doc);
				  mongoose.disconnect();
	  		}
	  	});
	  });
  })
  .catch(function(error) {
	  console.log(error);
  });

// setInterval(function(){console.log(os.loadavg())}, 500);