const express = require("express");
const router = express.Router();
const library = require("../library.js");
const Models = require("../Models.js");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get("/:id", (req, res) => {

	console.log(req.params);

	Models.seriesModel.find({id : req.params.id}).lean().exec((err, docs) => {

		console.log(docs[0]);
		res.render("single_series", {

			data : docs[0],
			css : "../style/single.css"

		})

	})

})




module.exports = router;
