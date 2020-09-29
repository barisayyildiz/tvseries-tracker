const express = require('express');
const router = express.Router();
const library = require("../library.js");
const Models = require("../Models.js");


router.get("/", async (req, res) => {

	Models.seriesModel.find({}, (err, docs) => {

		let frontPageData = [];

		docs.forEach(series => {

			frontPageData.push({});
			frontPageData[frontPageData.length-1].name = series.name;
			frontPageData[frontPageData.length-1].id = series.id;
			frontPageData[frontPageData.length-1].poster = series.poster;

		})

		//console.log(frontPageData);
		res.render("index", {

			data : frontPageData,
			css : "./style/index.css"

		});

	})


})


router.post("/query", (req, res) => {

	console.log(req.body);

	Models.seriesModel.find({

		"name" : {"$regex" : req.body.name, "$options" : "i"}

	}, (err, docs) => {

		console.log(docs);

		if(docs.length > 4)
			res.redirect(req.get('referer'));

		console.log(docs.length);

		let frontPageData = [];
		for(let i=0; i<docs.length; i++)
		{
			frontPageData.push({});
			frontPageData[frontPageData.length - 1].name = docs[i].name;
			frontPageData[frontPageData.length - 1].id = docs[i].id;
			frontPageData[frontPageData.length - 1].poster = docs[i].poster;
		}

		console.log("frontpage : ", frontPageData);

		res.render("search", {

			data : frontPageData,
			css : "../style/search.css"

		});

	})

})


router.get("/add", async(req, res) => {


	res.render("add");


})

router.post("/save", async (req, res) => {

	//let episodeNames = library.webScrapping(req.body.id, Number(req.body.totalSeasons));
	console.log("req.body : ", req.body);

	let {episodes, title, id, poster} = await library.makeAPICall(req.body.name);

	let series = {};
	series.name = title, series.id = id, series.poster = poster;
	series.seasons = [];

	for(let i=0; i<episodes.length; i++)
	{
		series.seasons.push({});
		series.seasons[i].episodes = [];
		for(let j=0; j<episodes[i].length; j++)
		{
			series.seasons[i].episodes.push({
				name : episodes[i][j],
				checked : false
			})
		}
	}


	//console.log(series);
	series.seasons.forEach(row => console.log(row));

	await Models.seriesModel.create(series);

	let docs = await Models.seriesModel.find({});

})


//Register / Sign In
router.get("/register", (req, res) => {

	res.render("register", {

		css : "./style/register.css"

	});

})

router.post("/register", (req, res) => {

	console.log("registered as : ", req.body);

})

router.get("/signin", (req, res) => {

	res.render("signin", {

		css : "./style/signin.css"

	});

})


module.exports = router;
