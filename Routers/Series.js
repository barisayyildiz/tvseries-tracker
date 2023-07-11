const express = require("express");
const router = express.Router();
const Models = require("../Models.js");

router.get("/:id", (req, res) => {
	Models.seriesModel.findOne({id : req.params.id}).lean().exec((err, docs) => {
		res.render("single_series", {
			data : docs,
			css : "../style/single.css"
		})
	})
})

module.exports = router;
