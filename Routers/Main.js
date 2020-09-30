const express = require('express');
const router = express.Router();
const library = require("../library.js");
const Models = require("../Models.js");
const bcrypt = require('bcrypt');
const passport = require("passport");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


router.get("/", ensureAuthenticated, async (req, res) => {

	console.log(res.locals.loggedin);

	Models.seriesModel.find({}, (err, docs) => {

		let frontPageData = [];

		docs.forEach(series => {

			frontPageData.push({});
			frontPageData[frontPageData.length-1].name = series.name;
			frontPageData[frontPageData.length-1].id = series.id;
			frontPageData[frontPageData.length-1].poster = series.poster;
			frontPageData[frontPageData.length-1]._id = series._id;
			frontPageData[frontPageData.length-1].plot = series.plot;

		})

		//console.log(frontPageData);
		res.render("index", {

			data : frontPageData,
			css : "./style/index.css"

		});

	})


})


router.post("/query", (req, res) => {

	console.log(req.body);

	Models.seriesModel.find({

		"name" : {"$regex" : req.body.name, "$options" : "i"}

	}, (err, docs) => {

		console.log(docs);

		if(docs.length > 4)
			res.redirect(req.get('referer'));

		console.log(docs.length);

		let frontPageData = [];
		for(let i=0; i<docs.length; i++)
		{
			frontPageData.push({});
			frontPageData[frontPageData.length - 1].name = docs[i].name;
			frontPageData[frontPageData.length - 1].id = docs[i].id;
			frontPageData[frontPageData.length - 1].poster = docs[i].poster;
		}

		console.log("frontpage : ", frontPageData);

		res.render("search", {

			data : frontPageData,
			css : "../style/search.css"

		});

	})

})


router.get("/add", async(req, res) => {


	res.render("add");


})

router.post("/save", async (req, res) => {

	//let episodeNames = library.webScrapping(req.body.id, Number(req.body.totalSeasons));
	console.log("req.body : ", req.body);

	let {episodes, title, id, poster, plot} = await library.makeAPICall(req.body.name);

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

	//series.total = library.getTotalEpisodes(series.season);
	console.log(episodes);

	//console.log(series);
	series.seasons.forEach(row => console.log(row));

	await Models.seriesModel.create(series);

	let docs = await Models.seriesModel.find({});

})


//Register / Sign In
router.get("/register", (req, res) => {

	res.render("register", {

		css : "./style/register.css"

	});

})

router.post("/register", async (req, res) => {

	console.log("registered as : ", req.body);

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
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			newUser.password = hashedPassword;


			await Models.userModel.create(newUser);

			req.flash("registered", "registered, now you can login...");

			res.redirect("/login");

		}


	}catch(e)
	{
		res.redirect("/register");
	}





})

router.get("/login", (req, res) => {

	console.log(res.locals.loggedin);

	//flash mesajları ekle !!!
	res.render("login", {

		css : "./style/login.css",
		flash : {
			registered : req.flash("registered"),
			password_short : req.flash("password_short"),
			not_auth : req.flash("not_auth"),
			logout : req.flash('logout')
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
