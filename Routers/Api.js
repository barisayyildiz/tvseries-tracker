const express = require("express");
const router = express.Router();
const library = require("../library.js");
const Models = require("../Models.js");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');



//bu api ile dizi bilgilerine erişilebilir
router.get("/series/:id", ensureAuthenticated, (req, res) => {

	console.log(req.user);

	Models.userModel.findOne({_id : req.user.id}, (err, user) => {

		let series = user.series;

		let found = series.find(item => item.id == req.params.id);

		if(found == undefined)
		{
			res.status(404).send("not found");
		}

		res.status(200).send(found);

	})

})


router.get("/user/", ensureAuthenticated, (req, res) => {

	Models.userModel.findOne({_id : req.user.id}, (err, user) => {

		let data = {};
		data.id = user._id;
		data.name = user.name;
		data.username = user.username;
		data.email = user.email;
		
		res.status(200).send(data);
	})

})


module.exports = router;

