const express = require("express");
const router = express.Router();
const library = require("../library.js");
const Models = require("../Models.js");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get("/:id", (req, res) => {

	Models.seriesModel.find({id : req.params.id}).lean().exec((err, docs) => {

		res.render("single_series", {

			data : docs[0],
			css : "../style/single.css"

		})

	})

})

module.exports = router;
