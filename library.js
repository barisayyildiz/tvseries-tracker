const got = require("got");
const jsdom = require("jsdom");


async function webScrapping(id, num)
{

	//https://www.imdb.com/title/tt0386676/episodes/_ajax?season=1

	for(let i=1; i<=num; i++)
	{
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

			console.log(item.children[1].children[2].textContent);

		})
		

	}

}


module.exports = {webScrapping : webScrapping};
