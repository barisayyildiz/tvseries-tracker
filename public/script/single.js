//Sayfa yüklendiğinde veri tabanından ilerlemeyi çek
/*fetch("http://localhost:3000/series/json/tt3032476")
.then(response => response.json())
.then(data => console.log(data));*/


// Tablodaki herhangi bir değişikliği server'a yolla
let tables = document.querySelectorAll("table");


tables.forEach(item => {

	item.addEventListener("change", () => {

		sendToDb();

	})

})

function sendToDb()
{
	fetch("http://localhost:3000/api/user")
	.then(response => response.json())
	.then(data => {

		let send = getEpisodes();
		console.log(send);

		//gets user id
		fetch(`http://localhost:3000/user/track/${data.id}`, {
			method: "POST",
			headers: {
	      'Content-Type': 'application/json'
	      // 'Content-Type': 'application/x-www-form-urlencoded',
	    },
	    body: JSON.stringify(send)


		})

	})


}

function getEpisodes()
{
	let result = [];
	let tables = document.querySelectorAll("tbody");
	for(let i=0; i<tables.length; i++)
	{
		result.push([]);
		let episodes = tables[i].children;
		for(let j=0; j<episodes.length; j++)
		{
			result[i].push(episodes[j].children[0].children[0].checked);
		}
	}

	return result;
}




let node = document.querySelector(".card");
console.log(node.id);

fetch(`http://localhost:3000/api/series/${node.id}`)
.then(response => response.json())
.then(data => {

	console.log(data);
	saveCheckedEpisodes(data.seasons);

})
.catch(e => console.log(e));

function saveCheckedEpisodes(data)
{
	console.log(data);

	let tables = document.querySelectorAll("tbody");

	for(let i=0; i<tables.length; i++)
	{
		let episodes = tables[i].children;
		for(let j=0; j<episodes.length; j++)
		{
			if(data[i].episodes[j].checked == true)
			{
				console.log(i, j);
				episodes[j].children[0].children[0].checked = true;
			}
		}
	}
}


function indexHeader()
{

	let list = document.getElementById("nav-tab").children;

	for(let i=0; i<list.length; i++)
	{
		//console.log(list[i].innerText);
		list[i].innerText = Number(i+1);

	}

}

function indexEpisodes()
{

	let seasons = document.querySelectorAll('[role="tabpanel"]');

	for(let i=0; i<seasons.length; i++)
	{
		let episodes = seasons[i].children[0].children[1].children;
		for(let j=0; j<episodes.length; j++)
		{
			episodes[j].children[1].innerText = String(i+1); //sezon
			episodes[j].children[2].innerText = String(j+1); //bölüm

		}



	}


}

function selectAllSeason()
{
	let checkbox = document.querySelectorAll("thead tr td input");
	let tables = document.querySelectorAll("table");
	console.log(checkbox);

	console.log(tables);

	for(let i=0; i<checkbox.length; i++)
	{
		checkbox[i].addEventListener("click", () => {

			let episodes = tables[i].children[1].children;

			if(checkbox[i].checked)
			{				
				for(let j=0; j<episodes.length; j++)
				{
					episodes[j].children[0].children[0].checked = true;
				}
			}else
			{
				for(let j=0; j<episodes.length; j++)
				{
					episodes[j].children[0].children[0].checked = false;
				}
			}

		})

	}


	sendToDb();

}

function selectAllSeries()
{
	let add = document.getElementById("selectall");
	let remove = document.getElementById("clearall");
	let tables = document.querySelectorAll("table");

	add.addEventListener("click", () => {

		let tables = document.querySelectorAll("table");

		for(let i=0; i<tables.length; i++)
		{
			let episodes = tables[i].children[1].children;
			for(let j=0; j<episodes.length; j++)
			{
				episodes[j].children[0].children[0].checked = true;
			}
		}

	})	

	remove.addEventListener("click", () => {

		for(let i=0; i<tables.length; i++)
		{
			let episodes = tables[i].children[1].children;
			for(let j=0; j<episodes.length; j++)
			{
				episodes[j].children[0].children[0].checked = false;
			}
		}

	})

	sendToDb();

}


indexHeader();
indexEpisodes();
selectAllSeason();
selectAllSeries();

