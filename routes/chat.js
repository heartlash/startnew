var express = require('express');
var auth = require('../middleware/auth');
var chatrouter = express.Router();
var chats = require('../models/chats');


chatrouter.use((req, res, next) =>{
	auth.isloggedin(req, res, next);
});

chatrouter.get('/', (req, res) =>{
	console.log('GET /dashboard/chat');
	
	console.log(user);
	chats.find({$or :[{sender : user.username}, {receiver : user.username}]},
	 function(err, chats){
		if(err) throw err;
		console.log("chats : ", chats);
		res.render('chat.ejs', { chats : chats, user : user});
	})
	
});

chatrouter.get('/:id', (req, res) =>{
	console.log('GET /dashboard/chat/:id');
	console.log(req.params.id);
	var user1 = {
		username : req.params.id
	};
	chats.find({$or : [

		{$and : [{sender : user.username}, {receiver : user1.username}]},
		{$and : [{sender : user1.username}, {receiver : user.username}]}
	]
}, function(err, chats){

		if(err) throw err;
		console.log("all the chats : ",chats)

		res.render('userchat.ejs', {chats : chats, user1 : user1, user : user});
	})

	
	

});

module.exports = chatrouter;

