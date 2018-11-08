var express = require('express');
var registerrouter = express.Router();

var users = require('../models/users');
var auth = require('../middleware/auth');

registerrouter.get('/', (req, res) =>{
	console.log('GET /login');
	res.render('signup.ejs');
});

registerrouter.post('/adduser', function(req, res){
	console.log('POST /adduser');
	var fname = req.body.fname;
	var lname = req.body.lname;
	var email = req.body.email;
	var password = req.body.password;

	var newuser = new users({
		fname : fname,
		lname : lname,
		email : email,
		password : password
	});

	users.registerusers(newuser, function(err, user){
		if(err){
			console.log(err);
		}
		else{
			console.log('useradded ' + user);
			res.redirect('/login');
		}
	})

} )
module.exports = registerrouter;