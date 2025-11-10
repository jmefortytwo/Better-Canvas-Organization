function removeOriginals() {
	const maindiv = document.getElementById("main");
	maindiv.innerHTML = "";
	maindiv.style = "display:flex";
}

async function fetchCourses() {
	const result = await fetch("https://oglethorpe.instructure.com/api/v1/courses");
	const data = await result.json();
	return data;
}

async function fetchAssignments(id) {
	const result = await fetch("https://oglethorpe.instructure.com/api/v1/courses/"+id+"/assignments");
	const data = await result.json();
	return data;
}

async function processCourses(courses) {
	let courseData = [];
	const maindiv = document.getElementById("main");
	maindiv.innerHTML += "\n<div id = 'biglist' style = 'display:inline-block'></div>";

	for(course of courses) {
		if(Date.now() < new Date(course.end_at).getTime()) {
			assignments = await fetchAssignments(course.id);
			courseData.push({id : course.id, name : course.name, assignments : assignments});
		}
	}

	return courseData;
}

async function displayAssignments(name,assignments) {
	const biglist = document.getElementById("biglist");
	biglist.innerHTML += "\n<div id = '"+name+"'></div>";
	const list = document.getElementById(name);

	const color = Math.floor(Math.random() * 16777215).toString(16);

	for(assignment of assignments) {
		list.innerHTML += "\n<div style = 'cursor:grab;background-color:#"+color+";margin:2px'>"+assignment.name+"</div>";
	}
}

function createCalendar() {
	let today = new Date();
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const maindiv = document.getElementById("main");
	maindiv.innerHTML += "\n<div id = 'calendar' style = 'display:inline-block'></div>";
	const calendar = document.getElementById("calendar");
	calendar.innerHTML += "\n<div>"+monthNames[today.getMonth()]+"</div>\n<div id = 'days'></div>";
	const days = document.getElementById("days");
	let length;

	if(today.getMonth() == 1) {
		if(today.getFullYear() % 4 == 0) {
			length = 29;
		} else{
			length = 28;
		}
	} else if(today.getMonth() % 2 == 0) {
		length = 31;
	} else {
		length = 30;
	}
	console.log(length);

	for(i = 0; i < length; i++) {
		console.log(i);
		if(i == today.getDate()) {
			days.innerHTML += "<p style = 'display:inline-block;color:red;width:100px;height:100px;outline:2px solid black'>   "+i+"</p>";
		} else {
			days.innerHTML += "<p style = 'display:inline-block;width:100px;height:100px;outline:2px solid black'>   "+i+"</p>";
		}
	}

}
async function main() {
	removeOriginals();

	const courses = await fetchCourses();
	const courseData = await processCourses(courses);
	for(course of courseData) {
		displayAssignments(course.name, course.assignments);
	}

	createCalendar();
}
main();
