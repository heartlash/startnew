var mongoose = require('mongoose');
var auth = require('../middleware/auth');
var useradschema = mongoose.Schema({

	image : {
		type : String
	},

	item : {
		type : String
	},

	description : {
		type : String
	},

	seller : {
		type : String
	},


}, timestamps : true);

 module.exports = mongoose.model('userad', useradschema);
 module.exports.postad = function(newad, callback){
 	newad.save(callback);
 }