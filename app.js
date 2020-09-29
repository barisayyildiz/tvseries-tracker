const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Models = require("./Models.js");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const flash = require('express-flash')
const session = require('express-session')
const MainRouters = require("./Routers/Main.js");
const SeriesRouters = require("./Routers/Series.js");
const passport = require("passport");

require('./config/passport')(passport);

mongoose.connect("mongodb://localhost/test", {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("Connected to database"));


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






app.listen(3000, () => console.log("Listening..."));


app.use("/", MainRouters);
app.use("/series/", SeriesRouters);
