const got = require("got");
const jsdom = require("jsdom");


async function webScrapping(id, num)
{

	//https://www.imdb.com/title/tt0386676/episodes/_ajax?season=1

	let episodeNames = [];

	for(let i=1; i<=num; i++)
	{
		episodeNames.push([]);

		let url = `https://www.imdb.com/title/${id}/episodes/_ajax?season=${i}`

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


module.exports = {webScrapping : webScrapping};
