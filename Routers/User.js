const express = require("express");
const router = express.Router();
const library = require("../library.js");
const Models = require("../Models.js");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get("/:id", ensureAuthenticated, (req, res) => {

	console.log(req.params);

	Models.userModel.find({_id : req.params.id}).lean().exec((err, docs) => {

		console.log(docs[0]);

		let data = {};
		data.username = docs[0].username;
		data.series = docs[0].series;

		console.log("length : ", data.series.length);

		//res.send(docs[0]);
		res.render("profile", {

			css : "../style/profile.css",
			data : data

		});

	})


})

router.post("/track/:id", (req, res) => {

	console.log(req.body);
	res.end();

})


module.exports = router;
