
var express = require('express');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var requiredir = require('require-dir');
var chats = require('./models/chats');
var routes = requiredir('./routes');
var auth = require('./middleware/auth');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/sedb', {
	useNewUrlParser : true
}).then(
	() => console.log('connected to db'),
	err => console.log(err)

);

var app = express();
app.set('port', 4000);
app.use(express.static(__dirname + '/public'));
app.use(cookieparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended: true
}));

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

for (var route in routes)
	app.use('/' + route, routes[route]);

app.get('/logout', (req, res) => {
	res.clearCookie('setok');
	res.redirect('/');
});

app.get('/admin/logout', (req, res) => {
	res.clearCookie('seadmin');
	res.redirect('/');
});


app.get('/', (req, res, next) => {
	if(!req.cookies.setok) return next();
		auth.direct(res, next, req.cookies.setok);
	},
	(req, res) => {
		console.log('GET /');
		res.render('home.ejs');
	});

app.get('/admin', (req, res, next) =>{
	if(!req.cookies.seadim) return next();
	auth.directadmin(res, next, req.cookies.seadim)
	},
	(req, res) => {
		res.render("admin.ejs");
	
});

app.listen(4000);

//for the chat socket.io
var mongojs = require('mongojs');
var db = mongojs("mongodb://127.0.0.1:27017/sedb",['chats']);
console.log("socket db set to go");
var socket = require('socket.io');
var sockapp = express();

var sockserver = sockapp.listen(5000, function(){
	console.log("the socket is listening");
});

var io = socket(sockserver);

io.on('connection', function(socket){
	console.log("socket id : ", socket.id);
	socket.on("chat", function(data){
		console.log("data : ", data);
		db.chats.save(data, function(err, result){
			if(err) throw err;
			console.log("chat successfully inserted");
		})
		io.sockets.emit("chat", data);
	});

	socket.on("typing", function(data){
		socket.broadcast.emit("typing", data);
	});
});
