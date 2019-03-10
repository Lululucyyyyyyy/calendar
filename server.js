var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var port = 3000;

var index = require('./routes/index');
var user = require('./routes/user');
var calendar = require('./routes/events');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', index);

app.use(session({secret: "Secret"}));

app.use('/user', user);
app.use('/u', calendar);

app.use('/home', function(err, req, res, next){
	console.log(err);
	res.redirect('login');
})
app.listen(port, function() {
  console.log('Listening in on port' + port);
});

module.exports = app;