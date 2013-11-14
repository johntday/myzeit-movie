Movies = new Meteor.Collection('coll_movies');

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
			var n = notificationFactory(MOVIE_CREATED_BY_USER, "movie", "admin", movie.title, movie.status, "/sciFiMovies/"+movieId, movie.created);
			Notifications.insert(n);
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

		MyLog("collections/movies.js/updateMovie/1", "properties", properties);

		Movies.update(
			_id,
			{$set: movie}
		);

		/**
		 * NOTIFICATION
		 */
		if (! isAdmin(user)) {
			var n = notificationFactory(MOVIE_UPDATED_BY_USER, "movie", "admin", movie.title, movie.status, "/sciFiMovies/"+_id, movie.created);
			Notifications.insert(n);
		} else {
			var m = Movies.findOne(_id);
			var n = notificationFactory(MOVIE_UPDATED_BY_ADMIN, "movie", m.userId, movie.title, movie.status, "/sciFiMovies/"+_id, movie.created);
			Notifications.insert(n);
		}
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

	clickedMovie: function(_id){
		Movies.update(_id, { $inc: { click_cnt: 1 }});
	},

	clickedMovieByMyMovieId: function(mymovie_id){
		Movies.update({mymovie_id: mymovie_id}, { $inc: { click_cnt: 1 }});
	},

	deleteMovie: function(movieId) {
		// remove associated stuff
		if(!this.isSimulation) {
			MovieTimelines.remove({movieId: movieId});
			Facts.remove({movieId: movieId});
		}

		/**
		 * NOTIFICATION
		 */
		if (isAdmin()) {
			var m = Movies.findOne(movieId);
			var n = notificationFactory(MOVIE_DELETED_BY_ADMIN, "movie", m.userId, m.title, m.status, "/sciFiMovies/"+movieId, getNow());
			Notifications.insert(n);
		}

		Movies.remove(movieId);
		return movieId;
	},

	addFavUser: function(_id, userId){
		Movies.update(_id,
			{ $addToSet: { favs: userId }, $inc: { favs_cnt: 1 } }
		);
	},

	deleteFavUser: function(_id, userId){
		Movies.update(_id,
			{ $pull: { favs: userId }, $inc: { favs_cnt: -1 } }
		);
	}

});
