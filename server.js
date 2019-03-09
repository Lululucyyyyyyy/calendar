var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('cookie-parser');

var port = 3000;

var index = require('./routes/index');
var user = require('./routes/user');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', index);

app.use('/user', user)

app.use('/home', function(err, req, res, next){
	console.log(err);
	res.redirect('login');
})
app.listen(port, function() {
  console.log('Listening in on port' + port);
});

module.exports = app;