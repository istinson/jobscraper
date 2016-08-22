var Xray = require('x-ray');
var xray = new Xray();
var fs = require('fs');
xray('https://jobs.target.com/employment/united-states-country-technology-jobs/1118/19396/6252001/2?' +
	'_ga=1.38221802.833238608.1471812594', 'li',
	[{
		id: 'a@data-job-id',
		title: 'h2',
		loc: '.job-location',
		date: '.job-date-posted',
		link: 'a@href'
	}])
  .paginate('a[class="next"]@href')
  (function(err, results) {
	  results = results.filter(function(item) {
		  if(item.loc.indexOf("California") > -1) {
			  return item;
		  }
	  });
	  results.forEach(function(item) {
		  item.id = 'target' + item.id;
	  });
	fs.writeFile('./target.json', JSON.stringify(results, null, '\  '));
  });