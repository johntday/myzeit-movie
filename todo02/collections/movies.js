Movies = new Meteor.Collection('coll_movies');
/*------------------------------------------------------------------------------------------------------------------------------*/
Movies.allow({
    insert: isAdmin,
    update: isAdmin,
    remove: isAdmin
});
/*------------------------------------------------------------------------------------------------------------------------------*/

Meteor.methods({
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
	}
});
