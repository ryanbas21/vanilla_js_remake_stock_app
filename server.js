var express = require('express');
var app = express();
var cors = require('cors');
var markit = require('node-markitondemand');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var config = require('./config.secret');
var PORT = process.env.PORT || 3000;
var http = require('http');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({
	secret: config.secret,
	resave: true,
	saveUninitialized: true
}));

//Index Route
app.get('/:id',function (req,res,next){
	
	markit.lookup(req.params.id, function (err,data){
		//Where data is an array of stocks
		//getStock()
			//getStock is an alias of lookup()
			//Used to search stocks.
		//getQuote()
		//Used to get latest stock data.
			if (err) {
				console.log(err);
				var errorString = "An error has occured, Bad Stock Symbol Most Likely!";
				res.send(errorString);
				return; 
			}
			if (data) {
				console.log(data);
				console.log("Type of Data " + typeof data);
				res.send(data);
				return;
			}
		console.log(data);
	});
});

app.listen(PORT,'localhost',function(){
	console.log('app started');
} )

