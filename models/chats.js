var mongoose = require('mongoose');
var auth = require('../middleware/auth');

var chatschema = mongoose.Schema({

	sender : {
		type : String
	},

	message : {
		type : String
	},

	receiver : {
		type : String
	},

	time : {
		type : Date
	}
});

module.exports = mongoose.model('chats', chatschema);
module.exports.savechats = function(newconvo, callback){
	newconvo.save(callback);
}