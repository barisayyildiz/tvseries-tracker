

document.getElementById("btn").addEventListener("click", async () => {


	//http://www.omdbapi.com/?apikey=976e02f&t=the+office
	let input = document.getElementById("input");
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

	/*
	//hide that later !!!
	let apikey = "976e02f";

	//get data from IMDb API
	let response = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&t=${name}&type=series`)
	let data = await response.json();

	let object = {id : data.imdbID, totalSeasons : data.totalSeasons};

	fetch("/save", {

		method: "POST",
		headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(object)

	})
	*/

	/*
	fetch("http://www.omdbapi.com/?apikey=976e02f&i=the+office&Season=1")
	.then(response => response.json())
	.then(data => console.log(data));
	*/

})


/*
async function deneme(name, num)
{

	for(let i=1; i<=num; i++)
	{
		let response = await fetch("http://www.omdbapi.com/?apikey=976e02f&i=the+office&Season=" + String(i))
		let data = await response.json();

		console.log(data);

	}


}
*/