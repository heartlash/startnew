 var mongoose = require('mongoose');
 var auth = require('../middleware/auth');
 var userschema = mongoose.Schema({

 	username : {
 		type : String,
 		required : true
 	},
 	name : {
 		type : String,
 		required : true
 	},
 	email : {
 		type : String,
 		required : true
 	},
 	password : {
 		type : String,
 		required : true
 	}
 });

 userschema.pre('save', function(next){
 	var derivedkey = auth.generatepassword(this.password);
 	this.password = derivedkey;
 	next();
 });

 module.exports = mongoose.model('users', userschema);
 module.exports.registerusers = function(newuser, callback){
 	newuser.save(callback);
 }