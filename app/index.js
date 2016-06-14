//Stock Simulator App
//Begin 6/14/2016 10:57am
//Ryan Bas github.com/ryanbas21
"use strict";
var buttonPress = document.getElementById("stockSubmit");

//run this function ONCLICK of add stock search bar
function getStockSymbol (event){
	event.preventDefault();
	var	userStock = document.getElementById("search").value;
	console.log(userStock);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost:3000/stock/' + userStock);
		xhr.send(userStock);
		xhr.onreadystatechange = function () {
		  var DONE = 4; // readyState 4 means the request is done.
		  var OK = 200; // status 200 is a successful return.
		  if (xhr.readyState === DONE) {
		    if (xhr.status === OK) 
		      console.log(xhr.responseText); // 'This is the returned text.'
		    } else {
		      console.log('Error: ' + xhr.status); // An error occurred during the request.
		    }
		  }
	
		
	
}

buttonPress.onclick = getStockSymbol;
