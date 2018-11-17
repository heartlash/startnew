var mongoose = require('mongoose');
var auth = require('../middleware/auth');
var announcementschema = mongoose.Schema({
	
	headline : {
		type : String
	},

	announce : {
		type :String
	}
});

module.exports = mongoose.model("announcement", announcementschema);

module.exports.announce = function(newannouncement, callback){
	newannouncement.save(callback);
}