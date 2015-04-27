var apikey = 'YOUR-API-KEY'; // Put your API key here

// Use this function to do stuff with your results.
// It is called after 'search' is executed.
function searchCallback(results) {
	for (var i = 0; i < 10; i++) {
		var platformName = "";
		for (var j = 0; j < results[i].platforms.length; j++) {
			platformName += results[i].platforms[j].name + ", ";
		}
		$('#searchResults').append(
			'<div id="result' + (i+1) + '"' +
				'<div class="row" id="name">' + results[i].name + '</div>' +
				'<div class="row" id="image"><img src="' + results[i].image.thumb_url + '"/></div>' +
				'<div class="row" id="description">' + results[i].deck + '</div>' +
				'<div class="row" id="platforms">' + platformName + '</div>' +
			'</div>'
		);
		console.log("Nothing: " + results);
	}
}

var userInput = "";
var apikey = "d40a650b5d8cc7c495d91736f95dee0b8993d809";

$(document).ready(function() {
	$('#submit').on('click', function(){
		$('#searchResults').empty();
		userInput = $('#search').val();
		search(userInput);
	});
	// Start the search here!
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	        console.log("result: " + data.results);
	    }
	});

}