/*
Name: Akshath Jain
Date: 4/12/18
Purpose: scripts to future proof the PFI websites - i.e. create script to automatically update the new dates on a yearly basis
*/

$(document).ready(function(){
	$.getJSON("https://raw.githubusercontent.com/akshathjain/PFIWebsite/newchanges/json/importantInfo.json?token=AKI1jC2LxLa8zF8RybKI4Q5-QfhaiOC3ks5a2K-3wA%3D%3D", function(data){
		
		var yearData = data[data.length - 1]; //get data for current year

		//assign signup link to button
		document.getElementById("signup-button").href = yearData.signup;

		//assign dates
		var startDate = new Date(yearData.startDate);
		var endDate = new Date(yearData.endDate);

		console.log(startDate);
	});
});