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

// bölümleri kullanıcı hesabına ekleme, çıkarma, güncelleme
router.post("/track/:id", ensureAuthenticated, (req, res) => {
	console.log("---------------------");
	console.log(req.body);
	console.log(req.user);
	console.log("---------------------");

	Models.userModel.findById(req.user.id, async (err, user) => {

		if(!err)
		{
			let series = user.series;			
			let found = series.find(item => item._id == req.body.seriesId);

			//kayıtlı değil, yeni eklenecek
			if(found == undefined)
			{

				let series = await Models.seriesModel.findById(req.body.seriesId)
				user.series.push(series);

				await user.save();

				let counter = 0;

				
				for(let i=0; i<series.seasons.length; i++)
				{
					for(let j=0; j<series.seasons[i].episodes.length; j++)
					{
						series.seasons[i].episodes[j].checked = req.body.episodes[i][j];
						if(req.body.episodes[i][j])
							counter++;
					}
				}

				console.log(counter);

				if(counter > 0)
				{
					user.save(function (err) {
						if (err) return handleError(err);
						console.log('series updated');
					});
				}else
				{
					found.remove();
					user.save(function (err) {
						if (err) return handleError(err);
						console.log('series removed');
					});
				}





			}else
			{
				let counter = 0;
				//kayıtlı, güncellenecek
				console.log(found);
				for(let i=0; i<found.seasons.length; i++)
				{
					for(let j=0; j<found.seasons[i].episodes.length; j++)
					{
						found.seasons[i].episodes[j].checked = req.body.episodes[i][j];
						if(req.body.episodes[i][j])
							counter++;
					}
				}

				console.log(counter);

				if(counter > 0)
				{
					user.save(function (err) {
						if (err) return handleError(err);
						console.log('series updated');
					});
				}else
				{
					found.remove();
					user.save(function (err) {
						if (err) return handleError(err);
						console.log('series removed');
					});
				}

				

				res.end();
			}

		}

	})


	res.end();


})


module.exports = router;
