const express = require('express');
const router = express.Router();
const library = require("../library.js");
const Models = require("../Models.js");

router.post("/save", async (req, res) => {

	//let episodeNames = library.webScrapping(req.body.id, Number(req.body.totalSeasons));
	let {episodes, title, id} = await library.makeAPICall(req.body.name);

	let series = {};
	series.name = title;
	series.id = id;
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

	//console.log(series);

	//diziyi veri tabanına kaydet

	/*
	let series = {}; series.name
	let episodes = [];
	for(let i=0; i<episodeNames.length; i++)
	{
		episodes.push([]);

		for(let j=0; i<episodeNames[i].length; j++)
		{
			episodes[i].push(episodeNames)


		}


	}
	*/




	//console.log(req.body);
	//res.send(episodeNames);

})

router.get("/", (req, res) => {

	
	Models.seriesModel.find({}, (err ,docs) => {

		console.log("docs : ", docs);

		res.send(docs);

	})
	

})

router.get("/add", async(req, res) => {


	res.render("index");


})

router.get("/add", async (req, res) => {

	await Models.seriesModel.create({

		name : "better call saul",
		id : 21,
		sezonlar : 
		[
			{
				bolumler : 
				[
					{
						name : "lorem",
						checked : true
					},

					{
						name : "lorem",
						checked : true
					}
				]
			}
		]

	})

	let docs = await Models.seriesModel.find({});
	res.send(docs);


})


router.get("/query", (req, res) => {

	Models.seriesModel.find({id : 21}, (err ,docs) => {

		res.send(docs);

	})

})

router.get("/users", (req, res) => {

	Models.userModel.find({}, (err, docs) => {

		res.send(docs);

	})

})

/*

router.get("/addUser", async (req, res) => {


	let newKullanici = {};

	newKullanici.name = "wildcard", newKullanici.password = "abcd", newKullanici.diziler = [];



	Models.seriesModel.find({id : 12}, async (err, docs) => {

		newKullanici.diziler.push(docs);

		console.log(docs);

		await Models.userModel.create(newKullanici);

		Models.userModel.find({}, (err, docs) => {

			res.send(docs);

		});

	})

	

})

*/


module.exports = router;