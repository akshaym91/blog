module.exports = function isLoggedIn(req, res, next){
	if (!(req.locals.session && req.locals.session.user)) {
		return res.redirect('/login');
	}
	next();
}