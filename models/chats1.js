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
					type : Date
				}
			}]

		}]

	

});

 module.exports = mongoose.model('chats', chatschema);

 module.exports.savechats = function(newconvo, callback){
 	newconvo.save(callback);
 }

 //db.chats.aggregate([ {$unwind : '$conversations'}, {$unwind : '$conversations.messagesent'},
 // {$sort : {'conversations.messagesent.time' : -1}}]).pretty()
db.chats.aggregate([{$unwind : '$conversations'}, {$unwind : '$conversations.messagesent'}]).update({$and : [{sender : "sullypuppy1234"},{conversations.recipient : "heartlash"}]},{$push : {'$conversations.messagesent.message': "i want us to be together"}})
