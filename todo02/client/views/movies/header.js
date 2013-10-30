Template.tmplHeader.helpers({
	searchText: function() {
		return Session.get("search_text");
	},
	isAdmin: function() {
		return isAdmin();
	},
	hasNoSidebar: function() {
		return !Session.get('has_sidebar');
	},
	canCreateMovie: function() {
		return canCreateMovie(Meteor.user());
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplHeader.events({
	// KEYUP SEARCH FIELD
	'keyup #header-search': function(e) {
		e.preventDefault();
		var value = String(e.target.value || "");
		var doTypeAheadSearch = false;

		/**
		 * do type-ahead search
		 * TODO
		 */
		if (doTypeAheadSearch) {
			if (!value)
				moviesHandle.reset(Meteor.MyClientModule.appConfig.pageLimit);
			else if (e.which === 27/*ESC*/)
				return;
			else if (e.which === 13/*ENTER*/)
				moviesHandle.reset(Meteor.MyClientModule.appConfig.pageLimitMax);
			else if (value.length < 3)
				moviesHandle.reset(Meteor.MyClientModule.appConfig.pageLimitMid);
			else
				moviesHandle.reset(Meteor.MyClientModule.appConfig.pageLimitMax);

			if (!value || value.length > 1)
				Session.set("search_text", value);
			Router.go('/sciFiMovies');
		} else {
			/**
			 * no type-ahead.  just search on <enter>.
			 */
			if (!value) {
				moviesHandle.reset(Meteor.MyClientModule.appConfig.pageLimit);
				Session.set("search_text", value);
				Router.go('/sciFiMovies');
			} else if (e.which === 13) {
				moviesHandle.reset(Meteor.MyClientModule.appConfig.pageLimitMax);
				Session.set("search_text", value);
				Router.go('/sciFiMovies');
			}
		}
	},
	// SHOW SIDEBAR
	'click #show-sidebar': function(e, template) {
		e.preventDefault();

		Session.set('has_sidebar', true);
	},
	// SEARCH BUTTON
	'click #btn-search': function(e, template) {
		var value = String($("#header-search").val() || "");
		if (!value) {
			moviesHandle.reset(Meteor.MyClientModule.appConfig.pageLimit);
			Session.set("search_text", value);
			Router.go('/sciFiMovies');
		} else {
			moviesHandle.reset(Meteor.MyClientModule.appConfig.pageLimitMax);
			Session.set("search_text", value);
			Router.go('/sciFiMovies');
		}
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
