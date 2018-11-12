var mongoose = require('mongoose');
var auth = require('../middleware/auth');
var chatschema = mongoose.Schema({

	sender : {
		type : String
	},

	conversations : [{
		recipient : {type : String},
		messagesent : [
			{
				message : {
					type : String
				},

				time : {
					type : Date,
					Default : Date.now()
				}
			}
		],
		messagereceived : [{
				message : {
					type : String
				},

				time : {
					type : Date,
					Default : Date.now()
				}
			}]

		}]

	

});

 module.exports = mongoose.model('chats', chatschema);

 module.exports.savechats = function(newconvo, callback){
 	newconvo.save(callback);
 }