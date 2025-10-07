function removeOriginals() {
	const maindiv = document.getElementById("main");
	const divs = maindiv.querySelectorAll('div');

	for(div of divs) {
		div.remove();
	}
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

	for(course of courses) {
		if(Date.now() < new Date(course.end_at).getTime()) {
			assignments = await fetchAssignments(course.id);
			courseData.push({id : course.id, assignments : assignments});
		}
	}

	return courseData;
}

async function displayAssignments(assignments) {
	const maindiv = document.getElementById("main");

	for(assignment of assignments) {
		maindiv.innerHTML += '\n<div>'+assignment.name+'</div>';
	}
}

async function main() {
	removeOriginals();

	const courses = await fetchCourses();
	const courseData = await processCourses(courses);
	for(course of courseData) {
		displayAssignments(course.assignments);
	}
}
main();
