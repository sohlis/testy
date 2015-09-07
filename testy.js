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




// Key  catering_orders > delivery_date
var zestyDates = [];
var cateringOrdersID = [];
// here `sampleJson` is being parsed and every `delivery_date` is being
// added to array `zestyDates`
// and making a same-sized array called `cateringOrdersID` so we can go back later
// and reference the `cateringOrdersID` based on the closest index of `zestyDates` (aka `indexOfClosestZestyDate`)
var a = sampleJson.catering_orders;
a.forEach(function(entry) {
    zestyDates.push(entry.delivery_date)
    cateringOrdersID.push(entry.id)
});

var zestyDatesParsed = [];

function dateParser(element, index, array) {
  // basically add the parsed version of the date to `zestyDatesParsed` array
  return zestyDatesParsed.push(Date.parse(element)) ;
}
// This says for every entry in the dates[] run function dateParser,
// which parses dates and fills `zestyDatesParsed[]` with the appropriate dates
zestyDates.every(dateParser);

// This takes two params
// `num` which will be todays date parsed -and-
//  `arr` which is an array of what will be parsed dates
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

var closestZestyDate = closest (nowParsed, zestyDatesParsed)

var indexOfClosestZestyDate = zestyDatesParsed.indexOf(closestZestyDate);

// console.log(indexOfClosestZestyDate);

// the id of the next restaurant we are eating
var idOfRestaurantInJSON = cateringOrdersID[indexOfClosestZestyDate];

// console.log(idOfRestaurantInJSON);

var cateringOrdersJSON = sampleJson.catering_orders

console.log(cateringOrdersJSON);

// cateringOrdersJSON.filter(function (person) {
//   return person.dinner == "sushi" }
// );
  // => [{ "name": "john", "dinner": "sushi" }]



// var parsedNewZestyDates = newZestyDates.every(dateParser);









// Don't touch
request(options, callback);
