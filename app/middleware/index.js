var express = require('express');

module.exports = function(app) {
	app.use(express.logger('dev'));

	/*This is good enough for now but, you 
	will want to use connect-mongo or something 
	of that sort for persistant sessions*/
	app.use(express.cookieParser());
	app.use(express.session({
		secret: 'Building a blog'
	}));
	app.use(express.bodyParser());

	//Expose Sessions to views
	app.use(function(req, res, next) {
		res.locals.session = req.session;
		next();
	});
}