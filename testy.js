// BEGIN successfuly requesting the ZESTY JSON
var request = require('request');
// Just a standin before we make the real live request
var sampleJson = require('./sample.json')

var headers = {
    'Origin': 'https://catering.zesty.com',
    'Accept-Language': 'en-US,en;q=0.8,nl;q=0.6,ru;q=0.4,de;q=0.2',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
    'Accept': 'application/json; version=2',
    'Referer': 'https://catering.zesty.com/',
    'Connection': 'keep-alive',
    'X-HASTY-API-KEY': '7f2e945f9eef4527ee6aa2be0a130718',
    'Cache-Control': 'max-age=0'
};

var options = {
    url: 'https://api.hastyapp.com/catering_clients/54d43eabe6159099b10002e4',
    headers: headers
};

function callback(error, response, body) {
  // this comment this in to re-get the JSON return
    // if (!error && response.statusCode == 200) {
    //     console.log(body);
    // }
}

// END  successfuly requesting the ZESTY JSON

// standin for the dates that we will recieve from the Zesty JSON
// Key  catering_orders > delivery_date
var zestyDates =
[
'2015-09-04T16:00:00-07:00',
'2015-09-04T16:00:00-07:00',
'2015-09-01T12:00:00-07:00',
'2015-09-01T12:00:00-07:00',
'2015-09-09T12:00:00-07:00',
'2015-09-08T08:45:00-07:00',
'2015-09-08T08:45:00-07:00',
'2015-09-08T12:00:00-07:00'
];

var datesParsed = [];

function dateParser(element, index, array) {
  return datesParsed.push(Date.parse(element)) ;
}
// This says for every entry in the dates[] run function dateParser,
// which parses dates and fills datesParsed[] with the appropriate dates
zestyDates.every(dateParser);
// this just logs our results
// console.log(datesParsed);

function closest (num, arr) {
    var curr = arr[0];
    var diff = Math.abs (num - curr);
    for (var val = 0; val < arr.length; val++) {
        var newdiff = Math.abs (num - arr[val]);
        if (newdiff < diff) {
            diff = newdiff;
            curr = arr[val];
        }
    }
    return curr;
}

var now = new Date(); //what is right now?
var nowParsed = Date.parse(now) //what is RN, parsed?

var closestZestyDate = closest (nowParsed, datesParsed)

var indexOfClosestZestyDate = datesParsed.indexOf(closestZestyDate);

console.log(indexOfClosestZestyDate);


// console.log(sampleJson)

// console.log(sampleJson.catering_orders);

var newZestyDates = [];

var a = sampleJson.catering_orders;
a.forEach(function(entry) {
    newZestyDates.push(entry.delivery_date)
});

console.log(newZestyDates);

var parsedNewZestyDates = newZestyDates.every(dateParser);









// Don't touch
request(options, callback);
