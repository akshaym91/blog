var errors = require('./errors');
var login = require('./login');

module.exports = function(app){
	//Home Page
	app.get('/', function(req, res){
		res.render('home.jade');
	})

	//Login/Logout
	login(app);

	//Error handling
	errors(app);
}