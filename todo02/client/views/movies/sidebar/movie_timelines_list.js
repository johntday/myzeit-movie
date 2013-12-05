Template.tmpl_movie_tl_item.helpers({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_movie_tl_list.helpers({
	movies: function() {
		//return MovieTimelines.find({}, findOptions(movieTimelineSort['click_cnt'], 5) );
		return MovieTimelines.find({}, {sort: {click_cnt:-1}, limit:5});
	},
	isMoreMovies: function() {
//		var cnt = Movies.find({favs: Meteor.userId()}).count();
//		return ( cnt > 5 );
		return true;
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
