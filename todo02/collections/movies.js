Movies = new Meteor.Collection('coll_movies');

//MoviesSearch = new Meteor.Collection('coll_movies_search');


STATUS_PENDING=1;
STATUS_APPROVED=2;
STATUS_REJECTED=3;
/*------------------------------------------------------------------------------------------------------------------------------*/
// Create a collection where users can only modify documents that
// they own. Ownership is tracked by an 'userId' field on each
// document. All documents must be owned by the user (or userId='admin') that created
// them and ownership can't be changed. Only a document's owner (or userId='admin')
// is allowed to delete it, and the 'locked' attribute can be
// set on a document to prevent its accidental deletion.

Movies.allow({
	insert: function (userId, doc) {
		//return ownsDocumentOrAdmin(userId, doc);
		return false;
	},
	update: function (userId, doc, fields, modifier) {
		return ownsDocumentOrAdmin(userId, doc);
	},
	remove: function (userId, doc) {
		return ownsDocumentOrAdmin(userId, doc);
	},
	fetch: ['userId']
});

Movies.deny({
	update: function (userId, docs, fields, modifier) {
		// can't change owners
		return _.contains(fields, 'userId');
	},
	remove: function (userId, doc) {
		// can't remove locked documents
		return doc.locked;
	},
	fetch: ['locked'] // no need to fetch 'userId'
});
/*------------------------------------------------------------------------------------------------------------------------------*/

Meteor.methods({
	createMovie: function(properties){
		MyLog("collections/movies.js/createMovie/1", "properties", properties);
		var user = Meteor.user(),
			userId = getDocUserIdForSaving(properties, user),
			//movieWithSameTitle = Movies.findOne( {title: {$regex: movie.title, $options: 'i'}} ),
			movieId = '';

		if (!user)
			throw new Meteor.Error(601, 'You need to login to create a new movie');
		if(!properties.title)
			throw new Meteor.Error(602, 'Please add a title');

		// check that there are no previous posts with the same link
//		if(movie.title && movieWithSameTitle){
//			//Meteor.call('upvotePost', postWithSameLink._id);
//			throw new Meteor.Error(603, 'Already have a movie with title "' + movie.title + '"');
//		}

		var movie = _.extend(properties, {
			userId: userId,
			author: getUserDisplayName(user),
			created: getNow(),
			votes: 0,
			comments: 0,
			baseScore: 0,
			score: 0,
			status: (isAdmin(user)) ? STATUS_APPROVED : STATUS_PENDING
		});

		MyLog("collections/movies.js/createMovie/2", "movie", movie);

		movieId = Movies.insert(movie);
		movie.movieId = movieId;

		/**
		 * NOTIFICATION
		 */
		if (! isAdmin(user)) {

		}

		return movie;
	},

	updateMovie: function(_id, properties){
		var user = Meteor.user();

		if (!user)
			throw new Meteor.Error(601, 'You need to login to update a movie');
		if(!properties.title)
			throw new Meteor.Error(602, 'Please add a title');

		var movie = _.extend(properties, {
			updated: getNow()
		});

		console.log("server movie just before update: "+JSON.stringify(movie));

		Movies.update(
			{_id: _id},
			{$set: movie}
		);
		return movie;
	},

	addMovieDirector: function(movie_id, director_name) {
//		if(! ownsDocumentOrAdmin(Meteor.userId(), xxx) )
//			throw new Meteor.Error(401, "You do not own this document");
		if (! movie_id)
			throw new Meteor.Error(422, "movie_id is empty");
		if (! director_name)
			throw new Meteor.Error(422, "Director name is empty");

		var person = Persons.findOne( {name: director_name}, {fields: {_id: 1} } );
		if (! person)
			throw new Meteor.Error(422, "Person does not exist for name: '" + director_name + "'");

		var movieDirector = {
			name: director_name,
			person_id: person._id
		};

		Movies.update({
			_id: movie_id
		}, {
			$addToSet: {directors: movieDirector}
		});

		return true;
	},

	clickedMovie: function(movie){
		Movies.update(movie._id, { $inc: { clicks: 1 }});
	},

	deleteMovie: function(movieId) {
		// remove movie timelines
		if(!this.isSimulation) {
			MovieTimelines.remove({movieId: movieId});
			Movies.remove(movieId);
		}
		return movieId;
	}

});
