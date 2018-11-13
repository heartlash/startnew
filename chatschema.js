var chatdata = new chats({
		sender : "sullypuppy1234",
		conversations : [{
			recipient : "heartlash",
			messagesent : [
				{message : "I missed you so much!!", time : Date.now()},
				{message : "I want us back", time : Date.now()}
			],
			messagereceived : [
				{message : "I missed you too", time : Date.now()},
				{message : "where were you?", time : Date.now()}
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
	