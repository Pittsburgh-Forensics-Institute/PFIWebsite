/*
Name: Akshath Jain
Date: 4/12/18
Purpose: scripts to future proof the PFI websites - i.e. create script to automatically update the new dates on a yearly basis
*/

$(document).ready(function(){
	$.getJSON("https://pghforensics.org/json/importantInfo.json", function(data){
		console.log(data);
	});
});