

document.getElementById("btn").addEventListener("click", async () => {


	//http://www.omdbapi.com/?apikey=976e02f&t=the+office
	let input = document.getElementById("seriesname");
	let text = input.value;

	let temp = text.split(" ");

	let name = "";
	temp.forEach(item => {

		name += item + "+";

	})

	name = name.slice(0,-1);

	fetch("/save", {

		method: "POST",
		headers : {
			"Content-Type" : "application/json",
		},
		body: JSON.stringify({name : name})
})
