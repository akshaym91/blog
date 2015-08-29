var loggedIn = require('../middleware/loggedIn');

module.exports = function(app) {

	app.get("/post/create", loggedIn, function(req, res) {
		res.render('post/create.jade');
	});

	app.post("/post/create", loggedIn, function(req, res, next) {
		var body = req.params('body');
		var title = req.params('title');
		var user = req.locals.session.user;

		BlogPost.create({
				body: body,
				title: title,
				author: user
			},
			function(err, post) {
				if (err) return next(err);
				res.redirect('/post/' + post.id);
			}
		);
	});
}