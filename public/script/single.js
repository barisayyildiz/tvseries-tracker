// index episodes and seasons
(function indexHeader()
{

	let list = document.getElementById("nav-tab").children;

	for(let i=0; i<list.length; i++)
		list[i].innerText = Number(i+1);

})();

(function indexEpisodes()
{
	let seasons = document.querySelectorAll('[role="tabpanel"]');

	for(let i=0; i<seasons.length; i++)
	{
		let episodes = seasons[i].children[0].children[1].children;
		for(let j=0; j<episodes.length; j++)
		{
			episodes[j].children[1].innerText = String(i+1); //season
			episodes[j].children[2].innerText = String(j+1); //episode

		}
	}

})();


// Loading checked episodes to frontpage
let node = document.querySelector(".card");
console.log(node.id);

fetch(`https://tvseries-tracker.herokuapp.com/api/series/${node.id}`)
.then(response => response.json())
.then(data => {

	console.log(data);
	saveCheckedEpisodes(data.seasons);

})
.catch(e => console.log(e));



// Send changes to server
let tables = document.querySelectorAll("table");


tables.forEach(item => {

	item.addEventListener("change", () => {

		sendToDb();

	})

})


function sendToDb()
{
	fetch("https://tvseries-tracker.herokuapp.com/api/user")
	.then(response => response.json())
	.then(data => {

		let send = {};
		send.episodes = getEpisodes();
		send.seriesId = document.querySelector(".card").id;

		//gets user id
		fetch(`https://tvseries-tracker.herokuapp.com/api/user/track/${data.id}`, {
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

		sendToDb();

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

		sendToDb();

	})

}


selectAllSeason();
selectAllSeries();
