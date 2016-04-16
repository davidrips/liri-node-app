
var keys = require('./keys');
consumerKey = keys.twitterKeys.consumer_key;
consumerSecret = keys.twitterKeys.consumer_secret;
accessTokenKey = keys.twitterKeys.access_token_key;
accessTokenSec = keys.twitterKeys.access_token_secret;

var Twitter = require('twitter');

var client = new Twitter ({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessTokenKey,
  access_token_secret: accessTokenSec
});

var params = {screen_name: 'erranttree', count: 20, trim_user: true};
function myTweets(){
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      for(var i = 0; i<tweets.length; i++){
        console.log(i + " : " +tweets[i].text)
      };
    }
  });
};

var spotify = require('spotify');
var action = process.argv[2];
var value = process.argv[3];

function main (){
  switch(action){
    case 'spotify-this-song':
      spotThisSong();
      break;
    case 'my-tweets':
      myTweets();
      break;
    case 'movie-this':
      aMovie();
      break;
    case 'do-what-it-says':
      doWhatIt();
      break;
    }
};

function spotThisSong(){
  spotify.search({type: 'track', query: value }, function(err,data){
    if (err){
      console.log('"what\'s my age again" by blink 182 ');
      return;
    } else {
      console.log(data.tracks.items[0].artists[0].name)
      console.log(data.tracks.items[0].name)
      console.log(data.tracks.items[0].preview_url)
      console.log(data.tracks.items[0].album.name)
    }
  })
};

function aMovie(){
  if (process.argv.length === 3){ movieValue = 'Mr.Nobody'; console.log("hadtonobody")}
  else {movieValue=value};
  movieName = movieValue.replace(' ','+');
  var request= require('request');
  request({method:'GET', uri:'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&tomatoes=true&r=json'}, function (error, response, json) {
    if (!error && response.statusCode == 200) {
      info= JSON.parse(json);
      console.log(info.Title);
      console.log(info.Year);
      console.log(info.imdbRating);
      console.log(info.Country);
      console.log(info.Language);
      console.log(info.Plot);
      console.log(info.Actors);
      console.log(info.Country);
      console.log(info.tomatoRating);
      console.log(info.tomatoURL);
   }
 });
};

function doWhatIt () {
 var fs = require('fs');
 fs.readFile("random.txt", "utf8", function(error, data) {
     console.log(data);
     var dataArr = data.split(',');
     action = dataArr[0];
     value = dataArr[1];
     console.log(action);
     console.log(value);
     if (data.indexOf("do-what-it-says")> -1){console.log("don\'t be a dick")
    }else {
     main();
    };
 });

}


main();
