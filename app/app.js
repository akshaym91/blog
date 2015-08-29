// console.log('\'Allo \'Allo!');

var mongoose = require('mongoose');
var express = require('express');
var User = require('./models/User.js');
var routes = require('./routes');

mongoose.connect('mongodb://localhost', function(err){
	if(err) throw err;

	var app = express();
	routes(app);

	app.listen(3000, function(){
		console.log('Now listening on http://localhost:3000')
	});
});