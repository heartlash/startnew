var express = require('express');
var auth = require('../middleware/auth');
var buyrouter = express.Router();
var userad = require('../models/userad');
var filter = require('./filter')
buyrouter.use((req, res, next) =>{
	auth.isloggedin(req, res, next);
});

buyrouter.use('/filter', filter);

buyrouter.get('/', (req, res) =>{
	console.log('GET /buy');
	userad.find({}, function(err, results){
		if(err) throw err;
		images = [];
		items = [];
		descriptions = [];
		sellers = [];
		ids = [];
		for(var result of results){
			images.push(result.image)
			items.push(result.item)
			descriptions.push(result.description)
			sellers.push(result.seller)
			ids.push(result._id)
		}
		console.log("images here : ", images);
		res.render("buy.ejs", {
			images : images,
			user : req.user,
			items : items,
			descriptions : descriptions,
			sellers : sellers,
			ids : ids
		});
	});
	
});





module.exports = buyrouter;