var jobWatcher = require('./../jobWatcher');
const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(config.getDbConnectionString());

function rippleEval() {
	return document.getElementsByTagName('h5');
}
function rippleFilter(item) {
	if (item.txsegment.source_string.indexOf('Engineer') > -1) {
		return true;
	}
}
function rippleParser(item) {
	return {
		_id: `ripple${item.txsegment.key}`,
		title: item.txsegment.source_string
	};
}

jobWatcher.watch('https://ripple.com/company/careers/all-jobs/', rippleEval, rippleFilter, rippleParser);