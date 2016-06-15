//configuring express
var express = require ('express');
var app = express();
var config = require('./config.secret'); //require config.secret for cookies
var PORT = process.env.PORT || 3000; //port
//http for requests
var http = require('http');

//setup for CORS for cross-orgin-references.
var cors = require('cors');
app.use(cors());
//setup for express session/body parser/cookie-parser
//this will be implemented for logins/authentications.
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var expressSession = require('express-session');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(cookieParser());
	app.use(expressSession({
		secret: config.secret,
		resave: true,
		saveUninitialized: true
	}));
//stockData is declared here so that the variable can be referenced outside of the scope
//and so that stockData can get updated each request.
var stockData;
//setup fetch-stock - an npm package which is being used to query for stock data
//NPM package was released a few weeks ago, so barring any updates, the package should be good for right now
var get_stock = require("fetch-stock");

//Express route on index. This will load the html file from the app folder.
app.get('/',function(req,res){
	//sends the file from specified route.
	res.sendFile(__dirname + '/app/index.html');
});

//Here is where the magic happens
//this express route will take in the given symbol and place it as the ID
//furthermore, the npm package takes over and gets data through the req.params.id and following function
//more logic to come.
app.get('/stock/:id', function (req,res){
	get_stock.getInfo(req.params.id, function(err, result){ 
	// if (err){
	// 	var errorString = "Bad Symbol Error";
	// 	console.log(errorString);
	// 	res.send(errorString);
	// 	} 
	// 	else { 
	// 		if(result == 'h'){
	// 			res.send(JSON.stringify([]));
	// 			return;
	// 	}
		stockData = JSON.parse(result);
		console.log(stockData[0]);
		res.send(stockData[0]);
		return;
		
	});

});


//setup so that express can load a static html page.
app.use(express.static('app'));



//node listens on server PORT or localhost
app.listen(PORT, 'localhost', function(){
	console.log('app started on ' + PORT);
});
