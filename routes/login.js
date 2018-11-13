var express = require('express');
var loginrouter = express.Router();
var auth = require('../middleware/auth');

loginrouter.get('/', (req, res) =>{
	console.log('GET /login');
	res.render('login.ejs');
});

loginrouter.post('/', (req, res) =>{
	console.log('POST /login');
	auth.authorize(req.body, (err, result) =>{
		if(err){
			res.json({
				success : false
			});
		}
		else{
			res.cookie('setok', result.token, {
				httpOnly : true
			});

			res.json({
				success : true,
				token : result.token,
				id : result.id,
				username : result.username
			});
			
		}
	});
});

module.exports = loginrouter;