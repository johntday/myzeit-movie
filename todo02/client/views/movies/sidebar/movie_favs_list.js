Template.tmpl_movie_item.helpers({
	displayLink: function() {
		return (this.year && this.year != -1) ? this.title + " (" + this.year + ")" : this.title;
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_movie_list.helpers({
	movies: function() {
		return Movies.find({favs: Meteor.userId()}, {sort: {title: 1}, limit: 5});
	},
	isMoreMovies: function() {
		var cnt = Movies.find({favs: Meteor.userId()}).count();
		return ( cnt > 5 );
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
