var Xray = require('x-ray');
var xray = new Xray();
var fs = require('fs');

xray('https://slack.com/jobs/dept/engineering', '.posting',
	[{
		title: 'h4',
		loc: '.location',
		link: 'a@href'
	}])
  (function(err, results) {
	  results = results.filter(function(item) {
		  if (item.loc.indexOf("Francisco") > -1 && item.title.indexOf("Engineer") > -1) {
			  return item;
		  }
	  });
	  results.forEach(function(item) {
		  item.id = 'slack' + item.link.substr(23, 6);
	  });
	  fs.writeFile('./slack.json', JSON.stringify(results, null, '\  '));
  });