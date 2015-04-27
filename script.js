
function searchCallback(results) {
	for (var i = 0; i < 10; i++) {
		var platformName = "";
		for (var j = 0; j < results[i].platforms.length; j++) {
			platformName += " - " + results[i].platforms[j].name;
		}
		if((i+1) % 3 == 0) {
			$('#searchResults').append(
				'<div id="searchRow" class="row">' +
					'<div id="result' + (i+1) + '" class="col-md-4">' +
						'<div id="name"><h4>Game Title:</h4> ' + results[i].name + '</div>' +
						'<div id="image"><img src="' + results[i].image.thumb_url + '"/></div>' +
						'<div id="description"><h5>Description:</h5> ' + results[i].deck + '</div>' +
						'<div id="platforms"><h5>Supported Platforms:</h5> ' + platformName + '</div>' +
					'<div>' +
				'</div>'
			);
		} else {
			$('#searchResults').append(
				'<div id="result' + (i+1) + '" class="col-md-4">' +
					'<div id="name"><h4>Game Title:</h4> ' + results[i].name + '</div>' +
					'<div id="image"><img src="' + results[i].image.thumb_url + '"/></div>' +
					'<div id="description"><h5>Description:</h5> ' + results[i].deck + '</div>' +
					'<div id="platforms"><h5>Supported Platforms:</h5> ' + platformName + '</div>' +
				'<div>'
			);
		}
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