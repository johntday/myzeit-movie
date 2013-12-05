/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_movie_stars_list.helpers({
	movies: function() {
		return Movies.find({stars: Meteor.userId()}, {sort: {title:1}, limit:5});
	},
	isMoreMovies: function() {
		var cnt = Movies.find({stars: Meteor.userId()}).count();
		return ( cnt > 5 );
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
