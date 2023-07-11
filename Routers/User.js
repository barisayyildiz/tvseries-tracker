const express = require("express");
const router = express.Router();
const Models = require("../Models.js");
const { ensureAuthenticated } = require('../config/auth');

router.get("/:id", ensureAuthenticated, (req, res) => {
	Models.userModel.findOne({_id : req.params.id}).lean().exec((err, docs) => {
		if(docs){
			const { username, series } = docs;
			res.render("profile", {
				css : "../style/profile.css",
				data : {
					username,
					series
				}
			});
		}
	})
})

// bölümleri kullanıcı hesabına ekleme, çıkarma, güncelleme
router.post("/track/:id", ensureAuthenticated, (req, res) => {
	Models.userModel.findById(req.user.id, async (err, user) => {
		if(!err)
		{
			let series = user.series;			
			let found = series.find(item => item._id == req.body.seriesId);

			//kayıtlı değil, yeni eklenecek
			if(found == undefined)
			{
				let series = await Models.seriesModel.findById(req.body.seriesId)

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

				series.counter = counter;

				// başa ekler
				user.series.unshift(series);
				if(counter > 0)
				{
					user.save(function (err) {
						if (err) return handleError(err);
						console.log('series updated');
						res.end();
					});
				}else
				{
					found.remove();
					user.save(function (err) {
						if (err) return handleError(err);
						console.log('series removed');
						res.end();
					});
				}
			}else
			{
				let index = series.findIndex(item => item._id == req.body.seriesId);
				series.splice(index,1);

				let counter = 0;
				for(let i=0; i<found.seasons.length; i++)
				{
					for(let j=0; j<found.seasons[i].episodes.length; j++)
					{
						found.seasons[i].episodes[j].checked = req.body.episodes[i][j];
						if(req.body.episodes[i][j])
							counter++;
					}
				}

				found.counter = counter;

				if(counter > 0){
					series.unshift(found);	
				}
				user.save(function (err) {
					if (err) return handleError(err);
					console.log('series updated');
					res.end();
				});
			}
		}
	})
})

module.exports = router;
