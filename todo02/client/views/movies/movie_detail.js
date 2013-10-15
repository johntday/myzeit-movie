Template.tmplMovieDetail.helpers({
	isAdmin: function() {
		return isAdmin();
	},
	isReadOnly: function() {
		return Meteor.MyClientModule.isReadOnly();
	},
	breadcrumbs: function() {
		Meteor.MyClientModule.scrollToTopOfPageFast();

		return {breadcrumbs: [
			new Meteor.MyClientModule.Breadcrumb("home","/",false),
			new Meteor.MyClientModule.Breadcrumb("SciFi","/sciFiMovies",false),
			new Meteor.MyClientModule.Breadcrumb(this.title,"",true)
		]};
	}
});

