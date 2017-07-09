
// nodejs librarys we using
var express = require ('express'); //use express
var bodyParser = require('body-parser');
const yelp = require('yelp-fusion');
var app = express();

//client key and secret
const clientId = '4P41LMy1M77JVLVlSUMD1g';
const clientSecret = 'QtC2oH1bUOI9JjjTMazNCjPo1cZHyd3aeNDZFLcnxq0JbWGE3AFSKhL35CstHy43';
const searchRequest = {
	  term:'Togos',
	  location: 'san francisco, ca'
}; 

var urlencodedParser = bodyParser.urlencoded({ extended: false }) //npm body parser middleware

app.set('view engine', 'ejs'); //use ejs templating 
//Use of express middleware so stylesheet works
// /assets is route or url and 'assets' is directory
app.use('/assets', express.static('assets')); 


app.get('/home', function(req, res) { //renders home.ejs when it is requested in url
	res.render('home');
});

name = ""; 
is_closed = "";
price = "";
location="";
add1="";
add2="";
app.post('/home', urlencodedParser, function(req, res) { //renders home-success.ejs when it is requested
	
	yelp.accessToken(clientId, clientSecret).then(response => {
		const client = yelp.client(response.jsonBody.access_token);	
		dataSearch = req.body; //this is whats in the textbox form
		console.log(dataSearch); 
		min = Math.ceil(0);
		max= Math.floor(10);
		randNum = Math.floor(Math.random()*(max-min)) + min ;

		client.search(dataSearch).then(response => {
		//name = "";
		name = JSON.stringify(response.jsonBody.businesses[randNum].name, null, 4).replace(/\"/g, ""); //result is the name of the first search result
		var stat = JSON.stringify(response.jsonBody.businesses[randNum].is_closed, null, 4).replace(/\"/g, "");
		if(stat =="false")
			is_closed="OPEN";
		else
			is_close="CLOSED";
		price=JSON.stringify(response.jsonBody.businesses[0].price, null, 4).replace(/\"/g, "");
		
	
		/*
		add1= JSON.stringify(response.jsonBody.businesses[0].location.address1, null, 4).replace(/\"/g, "");
		add2= 
		JSON.stringify(response.jsonBody.businesses[0].location.city, null, 4).replace(/\"/g, "") +", "
		JSON.stringify(response.jsonBody.businesses[0].location.state, null, 4).replace(/\"/g, "") +" "
		JSON.stringify(response.jsonBody.businesses[0].location.zipcode, null, 4).replace(/\"/g, "") 
		;
		*/
		location = JSON.stringify(response.jsonBody.businesses[0].location.display_address, null, 4).replace(/\"/g, "") ;
		console.log(name);
		console.log(is_closed);
		console.log(price);
		console.log(location);
		res.render('home-success');
		  });
		})
});


app.listen(4000); 