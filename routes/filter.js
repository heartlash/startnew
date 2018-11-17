var express = require('express');
var auth = require('../middleware/auth');
var filterrouter = express.Router();
var userad = require('../models/userad');


filterrouter.use((req, res, next) =>{
	auth.isloggedin(req, res, next);
});

filterrouter.post('/', (req, res) =>{
	var stext = req.body.stext;
	console.log('GET /buy search : ', stext);
	userad.find({item: { $regex: '.*' + stext.toLowerCase() + '.*' } }, function(err, results){
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
		console.log("images here : ", items);
		res.render("productfiltered.ejs", {
			images : images,
			user : req.user,
			items : items,
			descriptions : descriptions,
			sellers : sellers,
			ids : ids,
			stext : stext

			});
	});

	
});

module.exports = filterrouter;