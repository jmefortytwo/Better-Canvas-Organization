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

	assignments.forEach(assignment => {
		maindiv.innerHTML += '\n<div>'+assignment.name+'</div>';
	});

}

removeOriginals();
displayAssignments();
