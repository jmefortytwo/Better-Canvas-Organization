function removeOriginals() {
	const maindiv = document.getElementById("main");
	const divs = maindiv.querySelectorAll('div');

	divs.forEach(div  => {
		div.remove();
	});
}

async function fetchAssignments() {
	const result = await fetch("https://oglethorpe.instructure.com/api/v1/courses/6338/assignments");
	const data = await result.json();
	
	console.log("fetch successful");
	return data;
}

async function displayAssignments() {
	const assignments = await fetchAssignments();
	const maindiv = document.getElementById("main");
	const head = document.querySelector("head");
	head.innerHTML += "\n<!-- jsCalendar v1.4.5 Javascript and CSS from jsdelivr npm cdn -->\n<script src='https://cdn.jsdelivr.net/npm/simple-jscalendar@1.4.5/source/jsCalendar.min.js' integrity='sha384-F3Wc9EgweCL3C58eDn9902kdEH6bTDL9iW2JgwQxJYUIeudwhm4Wu9JhTkKJUtIJ' crossorigin='anonymous'></script>\n<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/simple-jscalendar@1.4.5/source/jsCalendar.min.css' integrity='sha384-CTBW6RKuDwU/TWFl2qLavDqLuZtBzcGxBXY8WvQ0lShXglO/DsUvGkXza+6QTxs0' crossorigin='anonymous'>";
	console.log("jsCalendar src added to <head>");

	maindiv.innerHTML += "\n<div class='auto-jsCalendar'></div>";
	console.log("calendar created");
/*
	assignments.forEach(assignment => {
		maindiv.innerHTML += '\n<div>'+assignment.name+'</div>';
	});
*/
}

removeOriginals();
displayAssignments();
