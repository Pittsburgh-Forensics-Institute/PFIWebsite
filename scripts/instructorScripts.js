/*
Name: Akshath Jain
Date: 7/23/17
Purpose: automatically load in instructor information 
*/

$(document).ready(function(){
	//get json
	$.getJSON('http://pghforensics.org/json/instructorInfo.json', function(data){
		//layout inflator
		data.sort(function(a, b){
			return a.lastName.localeCompare(b.lastName);
		})
		layoutInflator(data, 'instructor-template', 'instructor-container');
	});
});

function layoutInflator(data, template, holder){
	//populate the data
	var layout = document.getElementById(template);

	var row = null;
	for(var i = 0; i < data.length; i++){
		var layoutClone = layout.cloneNode(true);
		if(i % 3 == 0){
			row = document.createElement("DIV");
			row.className = "table-row";
		}

		var image = layoutClone.getElementsByTagName("img")[0];
		var instructorName = layoutClone.getElementsByTagName("h3")[0];
		var instructorDescription = layoutClone.getElementsByTagName("p")[0];

		image.src = "images/staff/2017/" + data[i].image;
		instructorName.innerHTML = "<b>" + data[i].firstName + " " + data[i].lastName + "</b>";
		instructorDescription.innerHTML = data[i].description;

		row.appendChild(layoutClone);
		
		if((i + 1) % 3 == 0)
			document.getElementById(holder).appendChild(row);
	}
	layout.style.display = "none";
}