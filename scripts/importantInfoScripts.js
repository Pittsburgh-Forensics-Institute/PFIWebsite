/*
Name: Akshath Jain
Date: 4/12/18
Purpose: scripts to future proof the PFI websites - i.e. create script to automatically update the new dates on a yearly basis
*/

$(document).ready(function () {
	$.getJSON("../json/importantInfo.json", function (data) {
		//get hash (e.g. pghforensics/#2017)
		var hash = window.location.hash.substring(1);
		var yearData;
		if (hash !== "") {
			for (var i = data.length - 1; i >= 0; i--) {
				if (data[i].year == hash)
					yearData = data[i];
			}
			if (yearData == undefined)
				yearData = data[data.length - 1];
		} else
			yearData = data[data.length - 1]; //get data for current year

		//assign signup link to button
		document.getElementById("signup-button").href = yearData.signup;

		//assign dates and times
		var whenString = "Sessions will be held Monday to Friday from " + yearData.startTime + " - " + yearData.endTime + " starting on " + yearData.startDate + " and ending on " + yearData.endDate + ".";
		document.getElementById("when-description").innerHTML = whenString;

		//assign location to link and map
		var whereString = "All lessons will be held at " + yearData.addressName;
		document.getElementById("where-description").innerHTML = whereString;
		document.getElementById("where-address").innerHTML = yearData.address;
		document.getElementById("map-iframe").src = yearData.googleMapsLink;

		//assign cost to faq section
		document.getElementById("program-cost").innerHTML = "The cost for PFI this year will be $" + yearData.cost + ".";

		//checkduedate
		var dueString = yearData.checkDueDate + ' Payment specifics have already been emailed out. Please <a href="#contact">contact</a> us with any questions.';
		document.getElementById("checkDueDate").innerHTML = dueString;

		//family discount

		var famDisString = yearData.isFamilyDiscount ? "Yes! Families sending more than one child only pay $" + (1 - yearData.familyDiscount)*yearData.cost + " after the first child. So one child is $" + yearData.cost + ", two children are $" + (2 - yearData.familyDiscount)*yearData.cost + ", and three children are $" + (3 - 2*yearData.familyDiscount)*yearData.cost + "." : "There is no family discount.";
		document.getElementById("familyDiscount").innerHTML = famDisString;

	});
});
