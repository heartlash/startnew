var express = require('express');
var adminrouter = express.Router();
var announcement = require('../models/announcement');
var auth = require('../middleware/auth');
var userad = require('../models/userad');




adminrouter.get('/', (req, res) =>{
	console.log('GET /admin');
	res.render('adminlogin.ejs');
});


adminrouter.get('/login', (req, res) =>{

	console.log('GET /admin/login');
	res.render('adminlogin.ejs');

});


adminrouter.post('/login', auth.authenticateadmin, (req, res) =>{
	console.log('POST /admin/post and redirecting');
	res.redirect('/admin/control');

});

adminrouter.get('/control', auth.isadminloggedin, (req, res) =>{

	console.log('GET /admin/control');
	res.render('control.ejs', {user : 'admin'});

});

adminrouter.get('/announcement', auth.isadminloggedin, (req, res) =>{

	console.log('GET /admin/control');
	announcement.find({}, function(err, results){
		if(err) throw err;
		console.log("results : ", results);
		res.render("announcement.ejs", {results : results, user : 'admin'});
	});

});

adminrouter.post('/announcement', auth.isadminloggedin, (req, res) =>{

	console.log('POST /admin/announcement');
	var newannouncement = new announcement({

		headline : req.body.headline,
		announce : req.body.announ
	});

	announcement.announce(newannouncement, function(err, ann){
		if(err) throw err;

		else{
			console.log("announcement added to db");
			res.redirect(req.originalUrl)
		}
	})

});

adminrouter.delete('/announcement/:id', auth.isadminloggedin, (req, res) =>{
	var id = req.params.id;
	console.log("delete parameter here : ", id);
	announcement.deleteOne({_id : id}, (err, result) =>{
		if(err) throw err;
		console.log("successfully deleted");
		res.redirect(req.originalUrl);
	});
});

adminrouter.get('/ads', auth.isadminloggedin, (req, res) =>{

	console.log('GET /admin/ads');
	userad.find({}, function(err, results){
		if(err) throw err;
		console.log("results : ", results);
		res.render("monitorads.ejs", {results : results, user : 'admin'});
	});

});

adminrouter.delete('/ads/:id', auth.isadminloggedin, (req, res) =>{
	var id = req.params.id;
	console.log("delete parameter here : ", id);
	userad.deleteOne({_id : id}, (err, result) =>{
		if(err) throw err;
		console.log("successfully deleted");
		res.redirect(req.originalUrl);
	});
});





module.exports = adminrouter;