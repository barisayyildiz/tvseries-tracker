


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
	
	seasons.forEach(item => {

		let episodes = item.children[0].children[1].children;
		
		for(let i=0; i<episodes.length; i++)
		{
			console.log(episodes[i]);
		}


	});


}

indexHeader();

indexEpisodes();


