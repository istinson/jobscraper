var jobWatcher = require('./jobWatcher');

function rippleEval() {
	return document.getElementsByTagName('h5');
}
function rippleQuality(item) {
	if (item.txsegment.source_string.indexOf('Engineer') > -1) {
		return true;
	}
}
function rippleParser(item) {
	return {
		id: `ripple${item.txsegment.key}`,
		title: item.txsegment.source_string
	};
}

jobWatcher.watch('https://ripple.com/company/careers/all-jobs/', rippleEval,
	rippleQuality, rippleParser, './ripple.json');