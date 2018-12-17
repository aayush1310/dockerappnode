// functionCall(callback);

// function functionCall(callback){
//     // var data = 50000 * 2;
//     var data = 1234567890*9876543210
//     console.log("Inside functionCall==>",data);
//     doSomeworkOne(data, callback);
// }

// function doSomeworkOne(data, callback){
//     var otherData = data + 2;
//     console.log("Inside doSomeworkOne==>",otherData);
//     doSomeworkTwo(otherData, callback);        
// }

// function doSomeworkTwo(otherData, callback){
//     var otherData = otherData * 2;
//     console.log("Inside doSomeworkTwo==>",otherData);
//     doSomeworkThree(otherData, callback);
// }

// function doSomeworkThree(otherData, callback){
//     var result = otherData *100;
//     console.log("Inside doSomeworkThree==>",result);
//     callback(result);
// }

// function callback(data){
//     // return data
//     console.log("Inside callback==>",data);
//     console.log(data);
// }


// functionCall();

// function functionCall(){
//     // var data = 50000 * 2;
//     var data = 1234567890*9876543210
//     console.log("Inside functionCall==>",data);
//     doSomeworkOne(data);
// }

// function doSomeworkOne(data){
//     var otherData = data + 2;
//     console.log("Inside doSomeworkOne==>",otherData);
//     doSomeworkTwo(otherData);        
// }

// function doSomeworkTwo(otherData){
//     var otherData = otherData * 2;
//     console.log("Inside doSomeworkTwo==>",otherData);
//     doSomeworkThree(otherData);
// }

// function doSomeworkThree(otherData){
//     var result = otherData *100;
//     console.log("Inside doSomeworkThree==>",result);
//     callback(result);
// }

// function callback(data){
//     // return data
//     console.log("Inside callback==>",data);
//     console.log(data);
// }

// var http = require('http');
// functionCall(callback);

// function functionCall(callback){
//     var data = 50000 * 2;
//     http.request('http://www.google.com', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body) // Print the google web page.
//      }
//     })
//     // console.log("Inside functionCall==>",data);
//     doSomeworkOne(data, callback);
// }

// function doSomeworkOne(data, callback){
//     var otherData = data + 2;
//     console.log("Inside doSomeworkOne==>",otherData);
//     doSomeworkTwo(otherData, callback);        
// }

// function doSomeworkTwo(otherData, callback){
//     var otherData = otherData * 2;
//     console.log("Inside doSomeworkTwo==>",otherData);
//     doSomeworkThree(otherData, callback);
// }

// function doSomeworkThree(otherData, callback){
//     var result = otherData *100;
//     console.log("Inside doSomeworkThree==>",result);
//     callback(result);
// }

// function callback(data){
//     // return data
//     console.log("Inside callback==>",data);
//     console.log(data);
// }

// var http = require('http');
// functionCall();

// function functionCall(){
//     var data = 50000 * 2;
//     http.request('http://demo0717091.mockable.io/DSOQuarter', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body) // Print the google web page.
//      }
//     })
//     // console.log("Inside functionCall==>",data);
// }
// One(function callback(){

// });

// function One(callback){
//     getData(function (data){
//         if(data != "ERROR"){
//             console.log("The Data is",data);
//             getData1(function (data){
//                 if(data != "ERROR"){
//                     console.log("The Data1 is",data);
//                 }
//                 else{
//                     console.log("The Data1 is",data)
//                 }
//             })
//         }
//         else{
//             console.log("The Data is",data)
//         }
//     })
//     console.log("After GetData");
// }

// function getData(callback){
//     var a = 300;
//     var b = 200;
//     var c = a*b;
//     if(c>0){
//         callback(c);
//     }
//     else{
//         callback("ERROR");
//     }
// }
// function getData1(callback){
//     var a = 300;
//     var b = 200;
//     var c = a*b;
//     if(c>0){
//         callback(c);
//     }
//     else{
//         callback("ERROR");
//     }
// }

// One();

// function One(){
//     var a = getData(90000278237800,898745845);
//     if(a != "ERROR"){
//         console.log("The Data is",a);
//     }
//     else{
//         console.log("The Data is",a)
//     }
//     console.log("After GetData");
// }

// function getData(p,q){
//     var c = p*q;
//     return c;
// }
// var cron = require('node-cron');

// var task = cron.schedule('* * * * *', function(){
//  console.log('running a task every minute');
// });

// task.start();
// var a = "aayushInvalid";

// if(a.search("Invalid")){
//     console.log("true");
// }

// console.log(new Date());

// var a = 2018-03-23T06:56:17.781Z;

// var b =2018-03-23T06:47:10.338Z;

// console.log(a-b);



// 'use strict';
// module.change_code = 1;
// var _ = require('lodash');
// var Twitter = require('twit');
// var CONSUMER_KEY = 'your consumer key here';
// var CONSUMER_SECRET = 'your consumer secret here';
// function TwitterHelper(accessToken) {
//   this.accessToken = accessToken.split(',');
//   this.client = new Twitter({
//     consumer_key: CONSUMER_KEY,
//     consumer_secret: CONSUMER_SECRET,
//     access_token: this.accessToken[0],
//     access_token_secret: this.accessToken[1]
//   });
// }

// TwitterHelper.prototype.postTweet = function(message) {
//   return this.client.post('statuses/update', {
//     status: message
//   }).catch(function(err) {
//       console.log('caught error', err.stack);
//     });
// };

// module.exports = TwitterHelper;


// //=========================================================================================

// 'use strict';
// var _ = require('lodash');
// var requestPromise = require('request-promise');
// var ENDPOINT = 'http://services.faa.gov/airport/status/';

// function FAADataHelper() {
// }

// FAADataHelper.prototype.getAirportStatus = function(airportCode) {
//   var options = {
//     method: 'GET',
//     uri: ENDPOINT + airportCode,
//     json: true
//   };
//   return requestPromise(options);
// };

// FAADataHelper.prototype.formatAirportStatus = function(aiportStatusObject) {
//   if (aiportStatusObject.delay === 'true') {
//     var template = _.template('There is currently a delay for ${airport}. ' +
//       'The average delay time is ${delay_time}.');
//     return template({
//       airport: aiportStatusObject.name,
//       delay_time: aiportStatusObject.status.avgDelay
//     });
//   } else {
//     //no delay
//     return _.template('There is currently no delay at ${airport}.')({
//       airport: aiportStatusObject.name,
//     });
//   }
// };

// module.exports = FAADataHelper;

// //=========================================================================================

// 'use strict';
// module.change_code = 1;
// var _ = require('lodash');
// var Alexa = require('alexa-app');
// var skill = new Alexa.app('airportinfo');
// var FAADataHelper = require('./faa_data_helper');
// var TwitterHelper = require('./twitter_helper');
// var utterancesMethod = skill.utterances;

// skill.utterances = function() {
//   return utterancesMethod().replace(/\{\-\|/g, '{');
// };

// skill.launch(function(request, response) {
//   var prompt = 'For delay information, tell me an Airport code.';
//   response.say(prompt).reprompt(prompt).shouldEndSession(false);
// });

// skill.intent('tweetAirportStatusIntent', {
//   'slots': {
//     'AIRPORTCODE': 'FAACODES'
//   },
//   'utterances': ['tweet {|delay|status} {|info} {|for} {-|AIRPORTCODE}']
// },
//   function(request, response) {
//     console.log('session details', request.sessionDetails);
//     console.log('accessToken: ', request.sessionDetails.accessToken);
//     var accessToken = request.sessionDetails.accessToken;
//     if (accessToken === null) {
//       //no token, show link account card
//       response.linkAccount().shouldEndSession(true).say('Your twitter account is not linked');
//       return true;
//     } else {
//       //i've got a token! make the tweet
//       var twitterHelper = new TwitterHelper(request.sessionDetails.accessToken);
//       var faaHelper = new FAADataHelper();
//       var airportCode = request.slot('AIRPORTCODE');
//       if (_.isEmpty(airportCode)) {
//         var prompt = 'i didn\'t have data for an airport code of ' + airportcode;
//         response.say(prompt).send();
//       } else {
//         faaHelper.getAirportStatus(airportCode).then(function(airportStatus) {
//           return faaHelper.formatAirportStatus(airportStatus);
//         }).then(function(status) {
//           return twitterHelper.postTweet(status);
//         }).then(
//           function(result) {
//             response.say('I\'ve posted the status to your timeline').send();
//           }
//         );
//         return false;
//       }
//     }
//   });

// skill.intent('airportInfoIntent', {
//   'slots': {
//     'AIRPORTCODE': 'FAACODES'
//   },
//   'utterances': ['{|flight|airport} {|delay|status} {|info} {|for} {-|AIRPORTCODE}']
// },
//   function(request, response) {
//     var airportCode = request.slot('AIRPORTCODE');
//     var reprompt = 'Tell me an airport code to get delay information.';
//     if (_.isEmpty(airportCode)) {
//       var prompt = 'I didn\'t hear an airport code. Tell me an airport code.';
//       response.say(prompt).reprompt(reprompt).shouldEndSession(false);
//       return true;
//     } else {
//       var faaHelper = new FAADataHelper();
//       console.log(airportCode);
//       faaHelper.getAirportStatus(airportCode).then(function(airportStatus) {
//         console.log(airportStatus);
//         response.say(faaHelper.formatAirportStatus(airportStatus)).send();
//       }).catch(function(err) {
//         console.log(err.statusCode);
//         var prompt = 'i didn\'t have data for an airport code of ' + airportcode;
//         response.say(prompt).reprompt(reprompt).shouldendsession(false).send();
//       });
//       return false;
//     }
//   }
// );
// //hack to support custom utterances in utterance expansion string
// console.log(skill.utterances().replace(/\{\-\|/g, '{'));
// module.exports = skill;

// function printfirst () { console.log (" first! "); printsecond(); } function printsecond() { console.log (" second! "); printfirst(); } printfirst();

// var games = new Array ("hockey", "tennis", "football", "cricket"); games.push("kabaddi", "kungfu"); var allgames = games.join(); console.log (allgames);
// var itemlist = new Array ("chair", "table", "box", "screwdriver", "pen");
// console.log(itemlist.length)

function options(a){
    return new Promise((resolve,reject)=>{
        if(a==1)
        resolve('Hello');
        
    })
}

function display(){
    options(1).then((result)=>{
        console.log(result);

    }).catch((err)=>{
        console.log(err);
    })
}

display();