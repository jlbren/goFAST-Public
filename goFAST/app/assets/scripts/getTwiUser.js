function getUser() { 

	var OAuth = require('OAuth');
	var oauth = new OAuth.OAuth(
      		'https://api.twitter.com/oauth/request_token',
      		'https://api.twitter.com/oauth/access_token',
      		//pub consumer  key 
      		'2NlsFbf4SRFnu6duBRvvn60Sp',
      		//private consumer key 
      		'WpW6eIkdT8k2ZmFetkTBw2sOGffimomGMZMM2TmVobvqJmVnzE',
      		'1.0A',
      		null,
      		'HMAC-SHA1'
    	);
    	oauth.get(
      		'https://api.twitter.com/1.1/trends/place.json?id=23424977',
      		//pub access token 
      		'3692866457-thAJZWae6GDVE3YqXTciSQiqqNI9nut2elLfKi8', 
      		//secret access token 
      		'2fd63V7Uhv0BNLeUcdodu3K9fmAQeQHZSBbeVm0sgKdjB', 
    		  function (e, data, res){
        		if (e) console.error(e);        
        		console.log(require('util').inspect(data));
        		done();      
     		 });    
}
