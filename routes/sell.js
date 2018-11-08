var express = require('express');
var auth = require('../middleware/auth');
var userad = require('../models/userad');
var multer = require('multer');
var fs = require('fs-extra');
var util = require('util');

var upload = multer({limits : {fileSize : 2000000000}, dest : '../uploads'});

var sellrouter = express.Router();

sellrouter.use((req, res, next) =>{
	auth.isloggedin(req, res, next);
});

sellrouter.get('/', (req, res) =>{
	console.log('GET /SELL');
	console.log("in sellrouter : ", req.user);
	res.render('sell.ejs', {
		user : req.user
	});
});

sellrouter.post('/', upload.single('image'), (req, res) =>{
	
	var image =  fs.readFileSync(req.file.path);
	var encodedimage = image.toString('base64');
	//console.log("encodedimage : ", encodedimage);
	//console.log("inside sellrouter post : ", req.body.item, req.body.description);
	var addata = new userad({
		image : encodedimage,
		item : req.body.item,
		description :req.body.description,
		seller : req.body.seller
	});

	userad.postad(addata, function(err, userad){
		if(err){
			console.log(err);
		}
		else{
			console.log('userad ' + userad);
			res.redirect('/buy');
		}
	})

});

module.exports = sellrouter;