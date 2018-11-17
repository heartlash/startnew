var express = require('express');
var auth = require('../middleware/auth');
var myadsrouter = express.Router();

var userad = require('../models/userad');

myadsrouter.use((req, res, next) =>{
	auth.isloggedin(req, res, next);
});

myadsrouter.get('/', auth.authenticate, (req, res) =>{
	console.log('GET /myads : ', req.user);
	userad.find({seller : req.user.username}, function(err, results){
		res.render('myads.ejs', {results :results, user : req.user});
	})
});

myadsrouter.delete('/:id', auth.authenticate, (req, res) =>{
	var id = req.params.id;
	console.log('DELETE /myads : ', req.user);
	console.log("delete parameter here : ", id);
	userad.deleteOne({_id : id}, (err, result) =>{
		if(err) throw err;
		console.log("successfully deleted");
		res.redirect('/myads');
	});
});


module.exports = myadsrouter;