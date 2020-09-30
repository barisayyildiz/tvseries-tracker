/*
document.getElementById("btn").onclick = () => {

	let input = document.getElementById("seriesname");
	let text = input.value;

	let temp = text.split(" ");

	let name = "";
	temp.forEach(item => {

		name += item + "+";

	})

	fetch("/save", {

		method: "POST"
		headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
		body: JSON.stringify({name : name})

	})


}
*/

document.getElementById("btn").onclick = () => {

	let input = document.getElementById("seriesname");
	let text = input.value;

	let temp = text.split(" ");

	let name = "";
	temp.forEach(item => {

		name += item + "+";

	})

	fetch("/save", {

		method: "POST",
		headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
		body: JSON.stringify({name : name})

	})

	


}