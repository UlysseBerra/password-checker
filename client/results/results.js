// defines the functions to check for different things in the password

function hasLowerCase(str) {
	return str.toUpperCase() != str;
}

function hasUpperCase(str) {
	return str.toLowerCase() != str;
}

function hasNumbers(str) {
	return /\d/.test(str);
}

function hasSpecial(str) {
	return str.includes('!') || str.includes('"') || str.includes('#') || str.includes('$') || str.includes('%') || str.includes('&') || str.includes("'") || str.includes('(') || str.includes(')') || str.includes('*') || str.includes('+') || str.includes(',') || str.includes('-') || str.includes('.') || str.includes('/') || str.includes(':') || str.includes(';') || str.includes('<') || str.includes('=') || str.includes('>') || str.includes('?') || str.includes('@') || str.includes('[')  || str.includes("]") || str.includes('^') || str.includes('_') || str.includes('`') || str.includes('{') || str.includes('|') || str.includes('}') || str.includes('~')
}

function isCommon(str) {
	return commonPasswords.includes(str, 0)
}

// retrieves the data from the browser's local storage

let password = localStorage.getItem("password");
let uname = localStorage.getItem("uname");
let byear = localStorage.getItem("byear");

// makes the results variable be the results

let results;

if (password.length > 5 && !password.toLowerCase().includes(uname.toLowerCase()) && !password.toLowerCase().includes(byear) && hasLowerCase(password) == true && hasUpperCase(password) == true && hasNumbers(password) == true && hasSpecial(password) == true) {
	results = "Ton mot de passe me paraît très bon, mais je peux me tromper. Après tout, je ne suis qu'un ordinateur !";
}
else if (password.length <= 5 || password.toLowerCase().includes(uname.toLowerCase()) || password.toLowerCase().includes(byear) || hasLowerCase(password) == false || hasUpperCase(password) == false || hasNumbers(password) == false || hasSpecial(password) == false) {
	results = "J'ai quelques suggestions : " + '<br>';
}

if (password.length <= 5) {
	results = results + '<br>' + '<br>' + "Ton mot de passe est assez court. Essaye de le rendre plus long.";
}

if (password.toLowerCase().includes(uname.toLowerCase())) {
	results = results + '<br>' + '<br>' + "Ton nom est dans ton mot de passe, cela peut le rendre facile à deviner si le mot de passe n'est pas très long.";
}

if (password.toLowerCase().includes(byear)) {
	results = results + '<br>' + '<br>' + "Ton année de naissance est dans ton mot de passe, cela peut le rendre facile à deviner si le mot de passe n'est pas très long.";
}

if (hasLowerCase(password) == false) {
	results = results + '<br>' + '<br>' + "Ton mot de passe n'a pas de lettres minuscules. Rajoutes-en.";
}

if (hasUpperCase(password) == false) {
	results = results + '<br>' + '<br>' + "Ton mot de passe n'a pas de lettres majuscules. Rajoutes-en.";
}

if (hasNumbers(password) == false) {
	results = results + '<br>' + '<br>' + "Ton mot de passe n'a pas de chiffres. Rajoutes-en.";
}

if (hasSpecial(password) == false) {
	results = results + '<br>' + '<br>' + "Ton mot de passe n'a pas de caractères spéciaux. Rajoutes-en.";
}

if (isCommon(password) == true) {
	results = results + '<br>' + '<br>' + "Ton mot de passe fait partie des 10000 mots de passe les plus courants, cela peut le rendre facile à deviner si le mot de passe n'est pas très long.";
}

// makes the result HTML element the results variable

const resultID = document.getElementById('resultID');
resultID.innerHTML = results;

// adds the data to server-side database for backup

function makePostRequest(uname, byear, pword, api) {
	let params = '{"uname":'+'"'+uname+'"'+',"byear":'+'"'+byear+'"'+',"pword":'+'"'+pword+'"'+'}';
	let xhr = new XMLHttpRequest();

	xhr.open("POST", api, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(params);
}

makePostRequest(uname, byear, password, 'http://127.0.0.1:5000/person');