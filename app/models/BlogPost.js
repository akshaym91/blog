var mongoose = require('mongoose');

var schema = mongoose.Schema({
	title: {
		type: String,
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	body: String,
	author: {
		type: String,
		ref: 'User'
	}
});

/* When new blogposts are created lets tweet about it 
npm install mongoose-lifecycle
http://plugins.mongoosejs.com?q=events */

var lifecycle = rquire('mongoose-lifecycle');
schema.plugin(lifecycle);

// Compile the model
var Post = mongoose.model('BlogPost', schema);

// Handle the events
Post.on('afterInsert', function(post){
	//Fake the tweet here
	var url = "http://localhost:3000/posts/";
	console.log('Read my new blog post! %s%s', url, post.id);
})