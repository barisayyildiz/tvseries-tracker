const express = require("express");
const router = express.Router();
const Models = require("../Models.js");
const { ensureAuthenticated } = require('../config/auth');

//bu api ile dizi bilgilerine erişilebilir
router.get("/series/:id", ensureAuthenticated, (req, res) => {
	Models.userModel.findOne({_id : req.user.id}, (err, user) => {
		let series = user.series;
		let found = series.find(item => item._id == req.params.id);

		if(found == undefined) {
			res.status(204).send("not found");
		}

		res.status(200).send(found);
	})
})


router.get("/user/", ensureAuthenticated, (req, res) => {
	Models.userModel.findOne({_id : req.user.id}, (err, user) => {
		const { _id:id, name, username, email } = user;
		res.status(200).send({
			id, name, username, email
		});
	})

})


module.exports = router;

