'use strict';

const yelp = require('yelp-fusion');
var name = "as";
// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = '4P41LMy1M77JVLVlSUMD1g';
const clientSecret = 'QtC2oH1bUOI9JjjTMazNCjPo1cZHyd3aeNDZFLcnxq0JbWGE3AFSKhL35CstHy43';

const searchRequest = {
  term:'Starbucks',
  location: 'san francisco, ca'
};

yelp.accessToken(clientId, clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token);

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
	name = JSON.stringify(firstResult, null, 4);
    //document.getElementById("result").innerHTML = prettyJson;
	console.log(prettyJson);
  });
}).catch(e => {
  console.log(e);
});

function changeParagraph() {
	document.getElementById("result").innerHTML = firstResult;
}

