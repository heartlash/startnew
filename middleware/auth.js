var jwt = require('jwt-simple');
var crypto = require('crypto');
var secret = 'hotspotfuckspot';

function isadminloggedin(req, res, next){

	if(!req.cookies.seadmin) return res.redirect('/login');

	next();
	
}
function generatetokenadmin(userpass){
	var tokenadmin = jwt.encode({
		userpass : userpass
	}, secret);
	console.log("token made");
	return {tokenadmin : tokenadmin};
}
function directadmin(res, next, token){

	console.log("directadmin called");
	var user = null;
	try{
		user = jwt.encode(tokenadmin, secret);
	}
	catch(err){
		return next();
	}
	res.redirect('/');
}
function authenticateadmin(req, res, next){
	if(req.body.adminname == 'admin' && req.body.adminpass == 'adminpass'){
		console.log(req.body.adminname , ' ', req.body.adminpass);
		var token = generatetokenadmin(req.body.adminpass);
		res.cookie('seadmin', token.tokenadmin, {
				httpOnly : true
			});
		res.redirect('/admin/control');
	}
	else res.redirect('http://localhost:4000/login');
}

function isloggedin(req, res, next){
	if(!req.cookies.setok) return res.redirect('/login');
	else {

		user = jwt.decode(req.cookies.setok, secret);
		console.log('user : ', user);
		req.user = {
			username : user.username
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
		username : user.username
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
	users.findOne({$or:[{email : user.email},{username : user.email}]
		
	} , (err, res) =>{
		if(err) throw err;
		var saltkey = res.password.split('+');
		if(!matchpassword(user.password, saltkey[0], saltkey[1])){
			callback('not found', null);
		}
		else{
			users.findOne({$or:[{email : user.email},{username : user.email}]
		
	} , (err, res) => {
				if(err) throw err;

				console.log("printing id : ", res._id);
				callback(null, generatetoken(user.email, res._id, res.username));


			});
			
			
		}
	});
}

function matchpassword(plainpass, salt, key){
	var derivedkey = crypto.pbkdf2Sync(plainpass, salt, 10000, 32, 'sha512').toString('hex');
	if(key == derivedkey) console.log("password matched");
	return key == derivedkey;
}

function generatetoken(email, id, username){
	var token = jwt.encode({
		username : username
	}, secret);
	return {token : token, id : id, username : username};
}

module.exports = {
	
	generatepassword : generatepassword,
	generatetoken : generatetoken,
	matchpassword : matchpassword,
	authorize : authorize,
	authenticate : authenticate,
	direct : direct,
	isloggedin : isloggedin,
	authenticateadmin : authenticateadmin,
	directadmin : directadmin,
	generatetokenadmin : generatetokenadmin,
	isadminloggedin : isadminloggedin
};