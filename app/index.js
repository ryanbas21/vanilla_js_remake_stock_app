//Stock Simulator App
//Begin 6/14/2016 10:57am
//Ryan Bas github.com/ryanbas21
"use strict";
var buttonPress = document.getElementById("stockSubmit");

//run this function ONCLICK of add stock search bar
function getStockSymbol (event){
	event.preventDefault();
	var	userStock = document.getElementById("search").value;
	
	$.post("/stock/" + userStock, function(data,status){
		console.log(status);
	}); 
	$.get("/stock/" + userStock, {}, function (req,res,data){
		console.log(data);
		

	})
		

		
	
		
	
}

buttonPress.onclick = getStockSymbol;
