//Stock Simulator App
//Begin 6/14/2016 10:57am
//Ryan Bas github.com/ryanbas21
"use strict";
var buttonPress = document.getElementById("stockSubmit");
var stockInfo;
//run this function ONCLICK of add stock search bar
function getStockSymbol (event){
	event.preventDefault();
	var	userStock = document.getElementById("search").value;

	$.get("/stock/" + userStock, {}, function (req,res,data){
		stockInfo = data.responseText;
		console.log(stockInfo);

	})
		

		
	
		
	
}

buttonPress.onclick = getStockSymbol;
