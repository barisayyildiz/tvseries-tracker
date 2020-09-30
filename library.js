const got = require("got");
const jsdom = require("jsdom");
const fetch = require("node-fetch");


async function makeAPICall(name)
{
	let apikey = "976e02f";

	//get data from IMDb API
	let response = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&t=${name}&type=series`)
	let data = await response.json();

	console.log("data : ", data);

	let object = {id : data.imdbID, totalSeasons : data.totalSeasons};

	console.log(object);

	return {episodes : await webScrapping(object), title : data.Title, id : data.imdbID, poster : data.Poster};

}

async function webScrapping(object)
{

	//https://www.imdb.com/title/tt0386676/episodes/_ajax?season=1

	let episodeNames = [];

	for(let i=1; i<=object.totalSeasons; i++)
	{
		episodeNames.push([]);

		let url = `https://www.imdb.com/title/${object.id}/episodes/_ajax?season=${i}`

		let res = await got(url);
		let pagedom = new jsdom.JSDOM(res.body.toString());
		//data is object
		let data = pagedom.window.document.querySelector("div.list.detail.eplist").children;

		let arr = [];
		let keys = Object.keys(data);
		keys.forEach(key => arr.push(data[key]));

		//console.log(arr);


		
		arr.forEach(item => {

			//console.log(item.children[1].children[2].textContent);

			episodeNames[i-1].push(item.children[1].children[2].textContent);

		})
		

	}

	return episodeNames;

}


function getTotalEpisodes(data)
{

	let total = 0;

	for(let i=0; i<data.length; i++)
		for(let j=0; j<data[i].length; j++)
			total++;

	console.log("<<<<<<<<<<<<<<<<<<<<<<total : ", total);

	return total;
}


module.exports = {webScrapping : webScrapping, makeAPICall : makeAPICall, getTotalEpisodes : getTotalEpisodes};
