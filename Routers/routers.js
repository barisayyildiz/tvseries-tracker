const express = require('express');
const router = express.Router();
const library = require("../library.js");

router.post("/save", (req, res) => {

	library.webScrapping(req.body.id, Number(req.body.totalSeasons));

	console.log(req.body);

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
