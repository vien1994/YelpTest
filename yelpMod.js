'use strict';
	const yelp = require('yelp-fusion');
	// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
	// from https://www.yelp.com/developers/v3/manage_app
	const clientId = '4P41LMy1M77JVLVlSUMD1g';
	const clientSecret = 'QtC2oH1bUOI9JjjTMazNCjPo1cZHyd3aeNDZFLcnxq0JbWGE3AFSKhL35CstHy43';
	const searchRequest = {
	  term:'Togos',
	  location: 'san francisco, ca'
	}; 
	var result = "";
	yelp.accessToken(clientId, clientSecret).then(response => {
		const client = yelp.client(response.jsonBody.access_token);	
		client.search(searchRequest).then(response => {
		result = JSON.stringify(response.jsonBody.businesses[0].name, null, 4);
		  });
		}).catch(e => {
		  console.log(e);
		});
		
		
exports.result = function () {
	return result;
}