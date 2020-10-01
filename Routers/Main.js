const express = require('express');
const router = express.Router();
const {makeAPICall} = require("../library.js");
const Models = require("../Models.js");
const bcrypt = require('bcrypt');
const passport = require("passport");
const { ensureAuthenticated, forwardAuthenticated, ensureAdmin} = require('../config/auth');


router.get("/", async (req, res) => {

	Models.seriesModel.find({}).lean().exec((err, docs) => {

		res.render("index", {

			data : docs,
			css : "./style/index.css"

		})

	})

})

router.post("/query", (req, res) => {

	Models.seriesModel.find({"name" : {"$regex" : req.body.name, "$options" : "i"}}).lean().exec((err, docs) => {

		if(docs.length > 4)
			res.redirect("/");

		res.render("search", {

			data : docs,
			css : "../style/search.css"

		});
	})
})


router.get("/add", ensureAdmin, async(req, res) => {
	
	res.render("add", {
	
		css : "../style/add.css"
	
	});

})


router.post("/save", async (req, res) => {


	let {episodes, title, id, poster, plot} = await makeAPICall(req.body.name);

	let series = {};
	series.name = title, series.id = id, series.poster = poster, series.plot = plot, series.counter = 0, series.fav = false;
	series.seasons = [];
	series.total = 0;

	for(let i=0; i<episodes.length; i++)
	{
		series.seasons.push({});
		series.seasons[i].episodes = [];
		for(let j=0; j<episodes[i].length; j++)
		{
			series.total++;
			series.seasons[i].episodes.push({
				name : episodes[i][j],
				checked : false
			})
		}
	}

	console.log(episodes);
	series.seasons.forEach(row => console.log(row));

	await Models.seriesModel.create(series);

	let docs = await Models.seriesModel.find({});

	res.send({name : series.name});

})


//Register / Sign In
router.get("/register", (req, res) => {

	res.render("register", {

		css : "./style/register.css"

	});

})

router.post("/register", async (req, res) => {

	try
	{
		let newUser = {};
		newUser.name = req.body.name;
		newUser.username = req.body.username;
		newUser.email = req.body.email;

		if(req.body.password.length < 6)
		{
			req.flash("password_short", "password should be at least 6 characters.");
			res.redirect("/login");
		}else
		{

			Models.userModel.findOne({email : req.body.email}, async (err, user) => {

				if(user == undefined)
				{
					const hashedPassword = await bcrypt.hash(req.body.password, 10);
					newUser.password = hashedPassword;


					await Models.userModel.create(newUser);

					req.flash("registered", "registered, now you can login...");

					res.redirect("/login");					
				}else
				{
					
					req.flash("already_registered", "This email is already registered");
					res.redirect("/login");
				}
			})
		}


	}catch(e)
	{
		res.redirect("/register");
	}

})

router.get("/login", (req, res) => {

	res.render("login", {

		css : "./style/login.css",
		flash : {
			registered : req.flash("registered"),
			password_short : req.flash("password_short"),
			not_auth : req.flash("not_auth"),
			logout : req.flash('logout'),
			already_registered : req.flash("already_registered")
		}

	});

})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});


router.get('/logout', (req, res) => {
  req.logout();
  req.flash('logout', 'You are logged out');
  res.redirect('/login');
});


module.exports = router;
