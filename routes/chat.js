var express = require('express');
var auth = require('../middleware/auth');
var chatrouter = express.Router();
var chats = require('../models/chats');


chatrouter.use((req, res, next) =>{
	auth.isloggedin(req, res, next);
});

chatrouter.get('/', (req, res) =>{
	console.log('GET /dashboard/chat');
	/*var chatdata = new chats({
		sender : "sullypuppy1234",
		conversations : [{
			recipient : "heartlash",
			messagesent : [
				{message : "I missed you so much!!"},
				{message : "I want us back"}
			],
			messagereceived : [
				{message : "I missed you too"},
				{message : "where were you?"}
			]
		}]
	});

	chats.savechats(chatdata, function(err, chat){
		if(err){
			console.log(err);
		}
		else{
			console.log('chats ' + chat);
			//res.redirect('/buy');
		}
	})
	*/
	var user = "sullypuppy1234";
	chats.find({sender : user}, function(err, chats){
		if(err) throw err;
		res.render('chat.ejs', { chats : chats});
	})
	
});

chatrouter.get('/:id', (req, res) =>{
	console.log('GET /dashboard/chat/:id');

	res.render('userchat.ejs', { user : req.user});
})

module.exports = chatrouter;