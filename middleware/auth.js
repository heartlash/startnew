var jwt = require('jwt-simple');
var crypto = require('crypto');
var secret = 'hotspotfuckspot';

function isloggedin(req, res, next){
	if(!req.cookies.setok) return res.redirect('/login');
	else {

		user = jwt.decode(req.cookies.setok, secret);
		console.log('user : ', user);
		req.user = {
			username : user.email
		};
	}

	next();
	
}

function direct(res, next, token){
	var user = null;
	try{
		user = jwt.encode(token, secret);
	}
	catch(err){
		return next();
	}
	res.redirect('/dashboard');
}
function authenticate(req, res, next){
	if(!req.cookies.setok) return res.redirect('/login');

	var user = null;
	try{
		user = jwt.decode(req.cookies.setok, secret);
	}

	catch(err){
		return res.redirect('/login');
	}

	req.user = {
		username : user.email
	};
	next();
}

function generatepassword(plainpass){
	var salt = crypto.randomBytes(10).toString('hex');
	var key = crypto.pbkdf2Sync(plainpass, salt, 10000, 32, 'sha512').toString('hex');
	return salt + '+' + key;
}

function authorize(user, callback){
	var users = require('../models/users');
	console.log(user.email);
	users.findOne({
		email : user.email
	}, (err, res) =>{
		if(err) throw err;
		var saltkey = res.password.split('+');
		if(!matchpassword(user.password, saltkey[0], saltkey[1])){
			callback('not found', null);
		}
		else{
			users.findOne({email : user.email}, (err, res) => {
				if(err) throw err;

				console.log("printing id : ", res._id);
				callback(null, generatetoken(user.email, res._id));


			});
			
			
		}
	});
}

function matchpassword(plainpass, salt, key){
	var derivedkey = crypto.pbkdf2Sync(plainpass, salt, 10000, 32, 'sha512').toString('hex');
	if(key == derivedkey) console.log("password matched");
	return key == derivedkey;
}

function generatetoken(email, id){
	var token = jwt.encode({
		email : email
	}, secret);
	return {token : token, id : id};
}

module.exports = {
	
	generatepassword : generatepassword,
	generatetoken : generatetoken,
	matchpassword : matchpassword,
	authorize : authorize,
	authenticate : authenticate,
	direct : direct,
	isloggedin : isloggedin
};