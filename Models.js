const mongoose = require("mongoose");

let Episode = new mongoose.Schema({

	name : String,
	checked : {
		type: Boolean,
		default : false
	}

})

let Season = new mongoose.Schema({

	episodes : [Episode]

})

let Series = new mongoose.Schema({

	name : String,
	id : String,
	poster : String,
	seasons : [Season],
	counter : Number,
	fav : Boolean,
	total : Number,
	plot : String

}, {
	versionKey: false
})

let User = new mongoose.Schema({

	name : String,
	username : String,
	email : String,
	password : String,
	series : [Series]

}, {
	versionKey: false
})


let seriesModel = mongoose.model('series', Series, 'series');
let userModel = mongoose.model("user", User, 'user')


module.exports = {seriesModel, userModel};
