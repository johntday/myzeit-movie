Template.tmplMovieCastList.helpers({
	breadcrumbs: function() {
		Meteor.MyClientModule.scrollToTopOfPageFast();
		return Session.get("breadcrumbs");
	},
	title: function() {
		return Session.get('breadcrumbs').breadcrumbs[2].title;
	},
	movieId: function() {
		return Session.get("selected_movie_id");
	}
});
