var mongoose = require('mongoose');
var User = mongoose.model('User');

var cleanString = require('../helpers');
var hash = require('../helpers');
var crypto = require('crypto');

module.exports = function(app) {
	app.get('/signup', function(req, res) {
		res.render('signup.jade');
	});

	// Create new Account
	app.post('/signup', function(req, res, next) {

		console.log('Came inside post', req.params);
		var email = req.params.email;
		var pass = req.params.pass;
		console.log(email, pass);
		if (!(email && pass)) {
			return invalid();
		}

		email = email.toLowerCase();
		
		User.findById(email, function(err, user) {
			if (err) return next(err);
			if (user) {
				return res.status(200).send('signup.jade', {
					exists: true
				});
			}

			crypto.randomBytes(16, function(err, bytes) {
				if (err) return next(err);

				var user = {
					_id: email
				};
				user.salt = bytes.toString('utf8');
				user.hash = hash(passs, user.salt);

				User.create(user, function(err, newUser) {
					if (err) {
						if (err instanceof mongoose.Error.ValidationError) {
							return invalid();
						}
						return next(err);
					}
				});
				req.locals.session.isLoggedIn = true;
				req.locals.session.user = email;
				console.log('Created user: %s', email);
				return res.redirect('/');
			});
		});
	});

	function invalid() {
		return res.send('signup.jade', {
			invalid: true
		});
	}
	app.get('/login', function(req, res) {
		res.render('login.jade');
	});

	// Create new Account
	app.post('/login', function(req, res, next) {
		var email = cleanString(req.params('email'));
		var pass = cleanString(req.params('pass'));
		if (!(email && pass)) {
			return invalid();
		}
		email = email.toLowerCase();
		//Query MongoDB
		User.findById(email, function(err, user) {
			if (err) return next(err);
			if (!user) {
				return invalid();
			}

			//check pass
			if (user.hash != hash(pass, user.salt)) {
				return invalid();
			}
			req.session.isLoggedIn = true;
			req.session.user = email;
			res.redirect('/');
		});
	});
}