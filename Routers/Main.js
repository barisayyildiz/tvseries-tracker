const express = require('express');
const router = express.Router();
const Models = require("../Models.js");
const bcrypt = require('bcrypt');
const passport = require("passport");

router.get("/", async (req, res) => {
	try {
		const series = await Models.seriesModel.find({}).lean().exec();
		res.render('index', {
			data: series,
			css: './style/index.css'
		})
	} catch (error) {
		console.error(error);
	}
})

router.post("/query", async (req, res) => {
	// const query = Models.seriesModel.find({"name" : {"$regex" : req.body.name, "$options" : "i"}}).lean().exec();
	try {
		const query = await Models.seriesModel.find({"name" : {"$regex" : req.body.name, "$options" : "i"}}).lean().exec();
		if(query.length > 4){
			res.redirect("/");
		}
		res.render("search", {
			data: query,
			css: "../style/search.css"
		})
	} catch(error){
		console.log(error);
	}
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
