


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

}


indexHeader();
indexEpisodes();
selectAllSeason();
selectAllSeries();

