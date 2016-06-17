//Stock Simulator App
//Begin 6/14/2016 10:57am
//Ryan Bas github.com/ryanbas21
"use strict";
var buttonPress = document.getElementById("stockSubmit"); //Storing the button as var
/* Global Array - to be changed?
 *Will be used to store the searched stocks, data for the day.
 *No Duplicates will be removed at this time
 *Duplicates may have to be removed, after the information is successfully stored
 *Into a database
 */
var stockInfoArr = [];
var stockData;
var stockInfo;
/**********OnClick Function
*This function runs onClick of the submit button
*it takes the value of the input field with the ID ("Search")
*It then stores that value as a variable type string
*Next, we take the string and we send that to the back-end node server
*The back-end node server takes the symbol and gets the Data 
*From it's NPM package
*/
function getStockSymbol (event){
	event.preventDefault();
		appendStockData() //call append stockData function
}//end of OnClick function
function appendStockData (getRequest) {
	console.log(stockInfoArr);
	for (var i = 0; i < stockInfoArr.length; i++){
		console.log("inside for loop");
		$("#stockId").append(stockData[i].id);
		$("#stockName").append(stockData[i].id);
		$("#stockSymbol").append(stockData[i].t);
		$("#stockPrice").append(stockData[i].l);	
		$("#stockExchange").append(stockData[i].e);
	}
	
}//End of appendStockData

function getRequest() {
	console.log("running now");
		var	userStock = document.getElementById("search").value;
			$.get("/stock/" + userStock, {}, function (req,res,data){
			stockInfo = data.responseText;	
			return stockInfoArr.push(stockInfo);
		}); 
}//end of getRequest



buttonPress.onclick = getStockSymbol;
