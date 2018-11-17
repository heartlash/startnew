var express = require('express');
var annrouter = express.Router();
var auth = require('../middleware/auth');
var announcement = require('../models/announcement');

annrouter.get('/', auth.authenticate, (req, res) =>{
	console.log('GET /announcement');
	//res.render('announcement.ejs');
	announcement.find({}, function(err, results){
		if(err) throw err;

		res.render("announcement.ejs", {results : results, user : req.user});
	});
});


module.exports = annrouter;