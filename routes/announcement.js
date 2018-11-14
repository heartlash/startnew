var express = require('express');
var annrouter = express.Router();
var auth = require('../middleware/auth');

annrouter.get('/', (req, res) =>{
	console.log('GET /announcement');
	res.render('announcement.ejs');
});


module.exports = annrouter;