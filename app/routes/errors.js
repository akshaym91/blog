module.exports = function(app) {

	// File not found Exceptions
	app.use(function(req, res, next) {

		if (req.accepts('html')) {
			return res.status(404).send('<h2>I am Sorry !! Page you requested could not be found.</h2>')
		}

		if (req.accepts('json')) {
			return res.status(404).send({
				error: 'File Not Found '
			});
		}

		//Default response type
		res.type('txt');
		res.status(404).send('File not found!')
	});

	//Success 500	
	app.use(function(err, req, res, next) {
		console.error('Error found at %s\n', req.url, err);
		res.status(500).send('Oops! We screwed it up somewhere !');
	});
}