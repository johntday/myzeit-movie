Template.tmplMovieDetail.helpers({
	isAdmin: function() {
		return isAdmin();
	},
	isReadOnly: function() {
		return Meteor.MyClientModule.isReadOnly();
	},
	breadcrumbs: function() {
		Meteor.MyClientModule.scrollToTopOfPageFast();
		return Session.get("breadcrumbs");
	}
});
