/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_movie_stars_list.helpers({
	movies: function() {
		return Movies.find({stars: Meteor.userId()}, findOptions(movieSort['title'], 5) );
	},
	isMoreMovies: function() {
		return true;
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
