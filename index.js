
var express = require('express');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var requiredir = require('require-dir');
var client = require('socket.io').listen(5000).sockets;
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


app.get('/', (req, res, next) => {
	if(!req.cookies.setok) return next();
		auth.direct(res, next, req.cookies.setok);
	},
	(req, res) => {
		console.log('GET /');
		res.render('home.ejs');
	});



app.listen(4000);

//for the chat socket.io

client.on('connection', function(socket){

	socket.on("chat", function(data){
		client.sockets.emit("chat", data);
	});
});



