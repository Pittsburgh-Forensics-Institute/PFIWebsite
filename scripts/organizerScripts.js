/*
Name: Akshath Jain
Date: 4/14/18
Purpose: scripts to automatically load organizers in index.html
*/

var dataSet;
var year;

$(document).ready(function(){
	$.getJSON("../json/instructorInfo.json", function(ds){

		dataSet = ds;
		year = ds[ds.length - 1].year;

		var organizerList = getOrganizers(ds[ds.length - 1].data);

		//update dropdown year selector
		document.getElementById('year-display').innerHTML = year + "&nbsp;&nbsp;<span class='caret'></span>";
		var yearSelections = document.getElementById("year-selections");
		for(var i = dataSet.length - 1; i >= 0; i--)
			yearSelections.innerHTML += "<li><a onclick='changeYearView(" + dataSet[i].year + ");'>" + dataSet[i].year + "</a></li>";

		layoutInflator(organizerList, "organizer-template", "organizer-holder");
	});
});

function layoutInflator(data, template, holder){
	//populate the data
	var layout = document.getElementById(template);

	//clear the holder
	document.getElementById(holder).innerHTML = ""; //remove all elements

	for(var i = 0; i < data.length; i++){
		var layoutClone = layout.cloneNode(true);
		layoutClone.style.display = "";

		//determine colomn spacing if there are 3 or 4 organizers (there should never be more than that)
		layoutClone.className = "col-sm-" + (12 / data.length);

		//obtain individual elements from layout
		var image = layoutClone.getElementsByTagName("img")[0];
		var instructorName = layoutClone.getElementsByTagName("h3")[0];
		var email = layoutClone.getElementsByTagName("p")[1];

		image.src = "images/staff/" + year + "/" + data[i].image;
		if(data[i].link != undefined){ //if image contains a link
			var link = data[i].link;
			image.onclick = function(){ window.location.assign(link); }
			image.className += ' clickable';
		}

		instructorName.innerHTML = "<b>" + data[i].firstName + " " + data[i].lastName + "</b>";
		if(data[i].link != undefined) //if name should contain an external link
			instructorName.innerHTML = "<b><a style='color: #333333;' href=" + data[i].link + ">"+ data[i].firstName + " " + data[i].lastName + "</a></b>";

		email.innerHTML = "<a href='mailto:'" + data[i].email + "'>" + data[i].email + "</a>";

		layoutClone.id += i;
		document.getElementById(holder).appendChild(layoutClone);

		//animate in
		$("#" + layoutClone.id).animate({
			opacity: 1
		}, 350);
	}

	layout.style.display = "none"; //hide the template element
	document.getElementById(holder).appendChild(layout); //add (hidden) template back
}

//change the year view
function changeYearView(yr){
	year = yr

	//change the dropdown view
	document.getElementById('year-display').innerHTML = year + "&nbsp;&nbsp;<span class='caret'></span>";

	var data;
	for(var i = 0; i < dataSet.length; i++){
		if(dataSet[i].year == year){
			data = dataSet[i].data;
			break;
		}
	}

	layoutInflator(getOrganizers(data), "organizer-template", "organizer-holder");
}

function getOrganizers(d){
	var list = [];
	for(var i = 0; i < d.length; i++){
		if(d[i].isOrganizer && d[i].isOrganizer != undefined)
			list.push(d[i]);
	}
	return list;
}
