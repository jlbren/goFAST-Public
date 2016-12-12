// set up express
var express = require("express"),
 http = require("http"),i
 bodyParser = require("body-parser"),
 jsonApp = express();

//read in twitter auth from json file 
var fs  = require("fs"); 
var twitAuth = fs.readFileSync("auth.json");
twitAuth = JSON.parse(twitAuth); 
//console.log(twitAuth);
 
//set up oauth
var OAuth = require("oauth");
var oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	//consumer key
	twitAuth.twitterKey,  
	//private consumer key
	twitAuth.twitterSecret, 
	'1.0A',
	null,
	'HMAC-SHA1'
);

//set up static route to html
jsonApp.use(express.static(__dirname + "/app"));

//listen on port 3030 
http.createServer(jsonApp).listen(3030);

//parse jQuery JSON to useful JS object
jsonApp.use(bodyParser.urlencoded({ extended: false }));

// set up routes
jsonApp.get("/test", function(req, res) {
	oauth.get(
		'https://api.twitter.com/1.1/search/tweets.json?q=putonti',
		//access token
		twitAuth.token, 
		//secret access toke
		twitAuth.secretToken, 
	  	function (e, data, res){
			if (e) console.error(e);        
			console.log(require('util').inspect(data));
			//done(); // this is throwing an error...       
	 	});    
 res.send("yo");
});

//post route
jsonApp.post("/results", function(req,res){
	console.log(req.body);
        var art = req.body; 
        var title = art.title; 
        var searchTweets = 	
		'https://api.twitter.com/1.1/search/tweets.json?q=' + title; 
	oauth.get(
		searchTweets, 
		//access token
		twitAuth.token, 
		//secret access toke
		twitAuth.secretToken, 
	  	function (e, data, result){
			if (e) console.error(e);        
			console.log(require('util').inspect(data));
 			res.send(data); 
			//done(); // this is throwing an error...       
	 	});    
}); 
//TODO
//post results from getPMC
//parse PMC results into get vars (remove spaces) 
//pass formated query to twitter api 
//add to json 
//append json to dom 
//
