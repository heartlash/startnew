var express = require('express');
var auth = require('../middleware/auth');

var dashrouter = express.Router({mergeparams : true});
var chat = require('./chat');
dashrouter.use((req, res, next) =>{
	auth.authenticate(req, res, next);
});

dashrouter.use('/chat', chat);

dashrouter.get('/', (req, res) => {
	console.log('GET /dashboard');
	console.log("req.user : ", req.user);
	res.render('home.ejs', {
		user : req.user
	});
});

module.exports = dashrouter;