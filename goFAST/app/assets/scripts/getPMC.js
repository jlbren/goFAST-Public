function getPMC(query){
	var pmcPref="https://eutils.ncbi.nlm.nih.gov/entrez/eutils/" 
	+ "esummary.fcgi?db=pubmed&retmode=json&rettype=abstract&id=";
	var  pmcURL=pmcPref + query; 
	console.log("PMC query: " + pmcURL); 
	$.getJSON(pmcURL, function(result){
		{format: "json"}
 		console.log("success");
 		console.log(result);
		minRes = result["result"];
		for(var key in minRes) {
			//convoluted way of extracting title 
			if(minRes[key].hasOwnProperty('title' )){
				var title = minRes[key].title;
				var cleanTitle = replaceAll(title, " ", "%20");  
				postTwit(cleanTitle); 
			}	
		}	
	})
	.fail(function (jqxhr, status, error) {
        	alert("fail"); 	
		console.log('error', status, error) }
	);
};

function getPMCID(query){
	var query = JSON.stringify(query.value);
	var queryString = replaceAll(query,' ', '+');
	var queryString = replaceAll(queryString, '"', '');
	console.log(queryString);
	var pmcPref = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=science[journal]+AND+"
	var pmcPost = "&retmode=json"
	var pmcIDURL = pmcPref + queryString + pmcPost; 
	console.log("PMC query: " + pmcIDURL); 
	
	$.getJSON(pmcIDURL, function(result){
		{format: "json"}
		console.log("success");
		console.log(JSON.stringify(result));
		
		$('.list').append('<form id="myForm">');	
		
		for(var i = 0; i < 5; i++){
			var id = result.esearchresult.idlist[i];
			if (id == " " || id == undefined){
				console.log('Not enough results');
				}
			else{
				id = replaceAll(JSON.stringify(id), "\"", "");
				$('.list').append('<input type="radio" name="ID" value="' + id + '\
				">' + id + '<br />');
				}
			}
		
		$('.list').append('<br /><input type="button" name ="submit" value="GO!" \
		onClick="button()"><br />');
		$('.list').append('</form>');
		
		$('.list').append('<br /><input type="button" name ="submit" value="Reset" \
		onClick="window.location.reload()"><br />');		
		})
	.fail(function (jqxhr, status, error) {
        	alert("fail"); 	
		console.log('error', status, error) }
	);
};

function button(){
	var radioButtons = document.getElementsByName("ID");
	for (var x = 0; x < radioButtons.length; x ++) {
		if (radioButtons[x].checked) {
			console.log(radioButtons[x].value);
			getPMC(radioButtons[x].value);
     	}
     }
}

function postTwit(q){
	console.log("posting: " + q ) ;
        var art = {"title" : q } 	
	$.post("results",art,function(response){
		{format: "json"};
		console.log(response);
		var obj = JSON.parse(response);

		var y = obj.statuses[0];
		if (y == " " || y == undefined){
			$('#pmc-output').append('Sorry, no results for that search!');
			$('#pmc-output').append('<br />**********<br />');
		}
		else {
			var realName = y.user.name;
			console.log(realName);
			var screenName = y.user.screen_name;
			console.log(screenName);
			var date = y.created_at;
			var dateString = JSON.stringify(date);
			var dateString = dateString.slice(1,12);
	
			var text = y.text;
			//search for position of https
			var ts = text.search('https');
			//slices text before https
			var text = text.slice(0,ts);
			console.log(text);
			//slices text after https aka the link
			var link2tweet = text.slice(ts);
			console.log(link2tweet);
		
			$('#pmc-output').append('Tweet: ');
			$('#pmc-output').append(text);
			$('#pmc-output').append('<br />**********<br />');
			$('#pmc-output').append('Tweeted by: ' + realName);
			$('#pmc-output').append('<br />**********<br />');
			$('#pmc-output').append('<a href="https://twitter.com/' + screenName + '">@' + screenName + '</a>');
			$('#pmc-output').append('<br />**********<br />');
			$('#pmc-output').append('Posted on: ' + dateString);
			$('#pmc-output').append('<br />**********<br />');
		}
	}); 
}; 

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}
