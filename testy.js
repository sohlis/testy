
var request = require('request');
// Importing the JSON that the zesty API has returns
var ourJson = require('./aSample.json')
// How we interact with the filesystem
var fs = require("fs");

/*
BEGIN request from Zesty API
*/

// This pulled from just cUrling
// from this http://curl.trillworks.com/#node
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
}

// So this pipes the `request` retun of `body` to a file named `aSample.json`
request(options, callback).pipe(fs.createWriteStream("aSample.json"));

/*
END request from Zesty API
*/

// Making empty arrays for both the zesty delivery dates `zestyDates`
// and their corresponing order IDs `cateringOrdersID`
var zestyDates = [];
var cateringOrdersID = [];
// here `ourJson` is being parsed and every `delivery_date` is being
// added to array `zestyDates`
// and making a same-sized array called `cateringOrdersID` so we can go back later
// and reference the `cateringOrdersID` based on the closest index of `zestyDates` (aka `indexOfClosestZestyDate`)
var a = ourJson.catering_orders;
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

var rightNow = new Date(); //what is right now?
var rightNowParsed = Date.parse(rightNow) //what is RN, parsed?

// so basically we are looking at all possible dates that zesty will be deliverying soon
// and then taking today and seeing what the closest zesty date is to today
var closestZestyDate = closest(rightNowParsed, zestyDatesParsed)

// Where is the closest zesty date located in the array of all possible dates
var indexOfClosestZestyDate = zestyDatesParsed.indexOf(closestZestyDate);

// This is the corresponing restaurant id from the `cateringOrdersID` array,
// based on the index that we found out from learning the closest date
var idOfRestaurantInJSON = cateringOrdersID[indexOfClosestZestyDate];

// just trimming some of that fat off dat big `ourJson` object
var cateringOrdersJSON = ourJson.catering_orders

// we cycle through all the different restaurants, looking for the id that
// we got in `idOfRestaurantInJSON`
for(var i = 0; i < cateringOrdersJSON.length; i++)
{
  if(cateringOrdersJSON[i].id == idOfRestaurantInJSON)
  {
    // ferk yerg! we found it, now we store dose values
   var nextZestyRestaurant = (cateringOrdersJSON[i].restaurant_name);
   var nextZestyRestaurantCuisine = (cateringOrdersJSON[i].restaurant_cuisine);
   var nextZestyRestaurantDesc = (cateringOrdersJSON[i].restaurant_description);
  }
}

// putting them in a big 'ol array for safe keeping
var todaysZestyMeal = [nextZestyRestaurant,nextZestyRestaurantCuisine,nextZestyRestaurantDesc]

// showing off for the ladies
console.log(todaysZestyMeal);
