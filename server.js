var express = require ('express');
var app = express();
var config = require('./config.secret'); //require config.secret for cookies
var PORT = process.env.PORT || 3000; //port
//http for requests
var http = require('http');


var cors = require('cors');
app.use(cors());
//setup for express session/body parser
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
var stockData;
//setup fetch-stock
var get_stock = require("fetch-stock");

app.get('/',function(req,res){
	res.sendFile(__dirname + '/app/index.html');
});

app.post('/stock/:id', function (req,res){
	get_stock.getInfo(req.params.id, function(err, result){ 
	if (err){
		var errorString = "Bad Symbol Error";
		console.log(errorString);
		res.send(errorString);
		} 
		else { 
			if(result[0] == 'h'){
				res.send(JSON.stringify([]));
				return;
		}
		stockData = JSON.parse(result);
		console.log(stockData);
		res.send(stockData);
		return;
		}
	});
app.get('/stock/:id', function (req,res){
	res.send(stockData);
	
});

});
app.use(express.static('app'));
//node listens on server PORT or localhost
app.listen(PORT, 'localhost', function(){
	console.log('app started on ' + PORT);
});
