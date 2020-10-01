require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Models = require("./Models.js");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const flash = require('express-flash')
const session = require('express-session');

const MainRouters = require("./Routers/Main.js");
const SeriesRouters = require("./Routers/Series.js");
const UserRouters = require("./Routers/User.js");
const ApiRouters = require("./Routers/Api.js");

const passport = require("passport");

require('./config/passport')(passport);


let portNumber = process.env.PORT || 3000;
app.listen(portNumber, () => console.log("Listening..."));

let db = process.env.MONGODB_URI || "mongodb://localhost/test";
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("Connected to database"));
console.log(db);

//public directory
app.use(express.static(__dirname + "/public"));
app.use(express.json());


//template engine (view engine)
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//body parser (post requests)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//session
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash())


app.use((req, res, next) => {

	res.locals.loggedin = req.isAuthenticated();

	//auth varsa kullanıcı bilgilerini locala kaydet
	if(req.user)
	{
		res.locals.username = req.user.username;
		res.locals.id = req.user.id;
	}

	next();

})




app.use("/", MainRouters);
app.use("/series/", SeriesRouters);
app.use("/user/", UserRouters);
app.use("/api/", ApiRouters);
