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
		document.getElementById("loader").style.display = "none"; //hide the loader
	});
});

function layoutInflator(data, template, holder){
	//populate the data
	var layout = document.getElementById(template);

	var row = null;
	for(var i = 0; i < data.length; i++){
		var layoutClone = layout.cloneNode(true);
		layoutClone.style.display = "";

		if(i % 3 == 0){
			row = document.createElement("DIV");
			row.className = "table-row";
		}

		//obtain individual elements from layout
		var image = layoutClone.getElementsByTagName("img")[0];
		var instructorName = layoutClone.getElementsByTagName("h3")[0];
		var instructorDescription = layoutClone.getElementsByTagName("p")[0];

		image.src = "images/staff/2017/" + data[i].image;
		if(data[i].link != undefined){ //if image contains a link
			var link = data[i].link;
			image.onclick = function(){ window.location.assign(link); }
			image.className += ' clickable';
		}

		instructorName.innerHTML = "<b>" + data[i].firstName + " " + data[i].lastName + "</b>";
		if(data[i].link != undefined) //if name should contain an external link
			instructorName.innerHTML = "<b><a style='color: #333333;' href=" + data[i].link + ">"+ data[i].firstName + " " + data[i].lastName + "</a></b>";

		instructorDescription.innerHTML = data[i].description;

		row.appendChild(layoutClone);
		
		if((i + 1) % 3 == 0 || i == data.length - 1){
			//add empty cells to fill the row if need be
			for(var j = 3 - row.childElementCount; j > 0; j--){
				var temp = document.createElement("DIV");
				temp.className = "table-cell";
				row.appendChild(temp);
			}
			
			document.getElementById(holder).appendChild(row);
		}
	}
	layout.style.display = "none"; //hide the template element
}