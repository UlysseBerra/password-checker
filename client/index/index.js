// resets the form onload
document.getElementById("password-test-form").reset();

// makes the index page redirect to the results page and adds the data to the browser's local storage

document.getElementById("button").addEventListener("click", redirectPage);

function redirectPage() {
	let uname = document.getElementById("uname").value;
	let byear = document.getElementById("byear").value;
	let password = document.getElementById("password").value;

	localStorage.setItem("uname", uname, 50);
	localStorage.setItem("byear", byear, 50);
	localStorage.setItem("password", password, 50);
	
	window.location.href = "../results/results.html";
}