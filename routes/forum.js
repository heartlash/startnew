var express = require('express');
var auth = require('../middleware/auth');
var forumrouter = express.Router();


forumrouter.get('/', auth.isloggedin, (req, res) =>{
	console.log('GET /forum');
	console.log('req.user : ', req.user);
	res.render('forum.ejs', {
		user : req.user
	});
});

module.exports = forumrouter;