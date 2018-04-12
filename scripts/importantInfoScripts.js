/*
Name: Akshath Jain
Date: 4/12/18
Purpose: scripts to future proof the PFI websites - i.e. create script to automatically update the new dates on a yearly basis
*/

$(document).ready(function(){
	$.getJSON("https://raw.githubusercontent.com/akshathjain/PFIWebsite/newchanges/json/importantInfo.json?token=AKI1jDwrxvtLKNy5ezRd9yGm_oqwVmdrks5a2LP_wA%3D%3D", function(data){
		
		var yearData = data[data.length - 1]; //get data for current year

		console.log(yearData);

		//assign signup link to button
		document.getElementById("signup-button").href = yearData.signup;

		//assign dates and times
		var whenString = "Sessions will be held Monday to Friday from " + yearData.startTime + " - " + yearData.endTime + " starting on " + yearData.startDate + " and ending on " + yearData.endDate + ".";
		document.getElementById("when-description").innerHTML = whenString;

		//assign location to link and map
		

	});
});