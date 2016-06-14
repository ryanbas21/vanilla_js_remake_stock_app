var express = require ('express');
var app = express();
var config = require('./config.secret'); //require config.secret for cookies
var PORT = process.env.PORT || 3000; //port
//http for requests
var http = require('http');


//setup for mongo
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://192.168.43.2:27017');
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
app.get('/stock/:id', function (req,res){
	
		get_stock.getInfo(req.params.id, function(err, result){ 
			console.log(result);
		if (err){
			console.log(err);
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
			res.send(stockData);
			console.log(stockData[0].l_cur);
			return ;
		}
	});

});

//node listens on server PORT or localhost
app.listen(PORT, 'localhost', function(){
	console.log('app started on ' + PORT);
});
