const express = require("express");
const router = express.Router();
const library = require("../library.js");
const Models = require("../Models.js");

router.get("/:id", (req, res) => {

	console.log(req.params);

	Models.userModel.find({_id : req.params.id}).lean().exec((err, docs) => {

		console.log(docs[0]);

		res.send(docs[0]);

	})


})


module.exports = router;
