var Nightmare = require('nightmare');
var vo = require('vo');
var _ = require('underscore');
var fs = require('fs');

var jobParser = function(oldJobs, result, quality, parsing) {
	var jobsArray = JSON.parse(oldJobs);
	return _.uniq(jobsArray.concat(_.map(_.filter(result, function (item) {
		return quality(item);
	}), function (item) {
		return parsing(item);
	})), function(item) {
		return item.id;
	});
};

//next page to go to
var nextUrl = 'https://jobs.target.com/employment/united-states-country-technology-jobs/1118/19396/6252001/2';
//counter ----NEEDS FIX
var page = 1;

function watch(careerUrl, jobEval, filtering, parsing, filePath) {
	page++;
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
		var oldJobs = fs.readFileSync(filePath, {encoding: 'utf8'});
		fs.writeFile(filePath, JSON.stringify(jobParser(oldJobs, result, filtering, parsing), null, '\  '));
		if(page < 11) {
			watch(`${nextUrl}/${page}`, jobEval, filtering, parsing, filePath);
		}
	});
}

function targetEval() {
	nextUrl = `https://jobs.target.com${document.getElementsByClassName('next')[0].getAttribute('href')}`;
	var items = Array.from(document.getElementsByTagName('li'));
	return items.map(function(item) {
		if (item.firstElementChild.getAttribute('data-job-id')) {
			return {
				link: `https://jobs.target.com${item.firstElementChild.getAttribute('href')}`,
				id: item.firstElementChild.getAttribute('data-job-id'),
				title: item.firstElementChild.firstElementChild.innerText,
				loc: item.firstElementChild.firstElementChild.nextElementSibling.innerText,
				date: item.firstElementChild.lastElementChild.innerText
			};
		}
	});
}

function targetFilter(item) {
	if(item) {
		if (item.loc === 'Sunnyvale, California' || item.loc === 'San Francisco, California') {
			return true;
		}
	}
	return false;
}

function targetParse(item) {
	return item;
}

watch(nextUrl, targetEval, targetFilter, targetParse, `./json/target.json`);