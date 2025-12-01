function setup() {
	const maindiv = document.getElementById("main");
	maindiv.innerHTML = "<script>let stored;let prev;</script>";
	maindiv.innerHTML += "\n<div id = 'biglist'></div>"
	maindiv.innerHTML += "\n<div id = 'calendar'></div>";
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
	biglist.innerHTML += "\n<ul id = '"+name+"' class = 'list'></ul>";
	const list = document.getElementById(name);
    
    i = 0;
	for(assignment of assignments) {
		list.innerHTML += "\n<li class = 'assignment' id = '"+i+"' onclick = 'stored = this.outerHTML;prev=this.id;'>"+assignment.name+"</li>";
		i++;
	}
}

function createCalendar() {
	let today = new Date();
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const calendar = document.getElementById("calendar");
	calendar.innerHTML += "\n<div>"+monthNames[today.getMonth()]+"</div>\n<ol id = 'days'></ol>";
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
	for(i = 0; i < length; i++) {
		if(i == today.getDate()) {
			days.innerHTML += "<li class = 'day' id = 'today'>   "+i+"<ol id = 'day"+i+"' class = 'dailylist' onclick = 'document.getElementById(prev).outerHTML=``;this.innerHTML += stored'></ol></li>";
		} else {
			days.innerHTML += "<li class = 'day'>    "+i+"<ol id = 'day"+i+"' class = 'dailylist'  onclick = 'document.getElementById(prev).outerHTML=``;this.innerHTML += stored'></ol></li>";
		}
	}

}

async function main() {
	setup();

	const courses = await fetchCourses();
	const courseData = await processCourses(courses);
	for(course of courseData) {
		displayAssignments(course.name, course.assignments);
	}

	createCalendar();
}
main();
