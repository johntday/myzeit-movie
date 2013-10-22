Template.tmplSidebar.helpers({
	movieLink: function() {
		return "/sciFiMovies/" + this._id;
	}
});

Template.tmplSidebar.events({
	'click #hide-sidebar': function(e, template) {
		e.preventDefault();

		Session.set('has_sidebar', false);
	}
});
