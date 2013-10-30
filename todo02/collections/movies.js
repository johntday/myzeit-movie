Movies = new Meteor.Collection('coll_movies');

//MoviesSearch = new Meteor.Collection('coll_movies_search');


STATUS_PENDING=1;
STATUS_APPROVED=2;
STATUS_REJECTED=3;
/*------------------------------------------------------------------------------------------------------------------------------*/
Movies.allow({
    insert: isAdmin,
    update: isAdmin,
    remove: isAdmin
});
/*------------------------------------------------------------------------------------------------------------------------------*/

Meteor.methods({
	createMovie: function(properties){
		//console.log("server: "+JSON.stringify(properties));
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

		console.log("server movie just before insert: "+JSON.stringify(movie));

		//		if(status == STATUS_APPROVED){
//			// if post is approved, set its submitted date (if post is pending, submitted date is left blank)
//			movie.submitted  = submitted;
//		}

		movieId = Movies.insert(movie);

//		var movieAuthor =  Meteor.users.findOne(movie.userId);
//		Meteor.call('upvotePost', movieId,movieAuthor);
//
//		if(getSetting('newPostsNotifications')){
//			// notify admin of new posts
//			var properties = {
//				movieAuthorName : getDisplayName(movieAuthor),
//				movieAuthorId : movie.userId,
//				movieHeadline : headline,
//				movieId : movieId
//			}
//			var notification = getNotification('newPost', properties);
//			// call a server method because we do not have access to admin users' info on the client
//			Meteor.call('notifyAdmins', notification, Meteor.user(), function(error, result){
//				//run asynchronously
//			});
//		}

		movie.movieId = movieId;
		return movie;
	},

	updateMovie: function(properties){
		//console.log("server: "+JSON.stringify(properties));
		var user = Meteor.user(),
			userId = getDocUserIdForSaving(properties, user);

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

		console.log("server movie just before insert: "+JSON.stringify(movie));

		//		if(status == STATUS_APPROVED){
		//			// if post is approved, set its submitted date (if post is pending, submitted date is left blank)
		//			movie.submitted  = submitted;
		//		}

		movieId = Movies.insert(movie);

		//		var movieAuthor =  Meteor.users.findOne(movie.userId);
		//		Meteor.call('upvotePost', movieId,movieAuthor);
		//
		//		if(getSetting('newPostsNotifications')){
		//			// notify admin of new posts
		//			var properties = {
		//				movieAuthorName : getDisplayName(movieAuthor),
		//				movieAuthorId : movie.userId,
		//				movieHeadline : headline,
		//				movieId : movieId
		//			}
		//			var notification = getNotification('newPost', properties);
		//			// call a server method because we do not have access to admin users' info on the client
		//			Meteor.call('notifyAdmins', notification, Meteor.user(), function(error, result){
		//				//run asynchronously
		//			});
		//		}

		movie.movieId = movieId;
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
