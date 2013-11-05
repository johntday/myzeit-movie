/**
 * SESSION VARIABLE DEFAULTS
 */
Session.setDefault('search_text', '');
Session.setDefault('form_update', false);
Session.setDefault('selected_movie_id', null);
Session.setDefault('selected_person_id', null);
Session.setDefault('breadcrumbs', null);
Session.setDefault('has_sidebar', true);
Session.setDefault('is_example_timeline', false);
/*------------------------------------------------------------------------------------------------------------------------------*/
//Deps.autorun(function() {
//	Meteor.subscribe('selectedMovieTimeline', Session.get('selected_movie_id'));
//	Meteor.subscribe('pubsub_user_movie_timeline_list', Session.get('selected_movie_id'), Meteor.userId());
//});

/**
 * Notifications
 */
// Notifications - only load if user is logged in
if(Meteor.userId() != null) {
	Meteor.subscribe('pubsub_notification_list');
}
/**
 * Movies
 */
//moviesHandle = Meteor.subscribeWithPagination('pubsub_movie_list',  Meteor.MyClientModule.appConfig.pageLimit);
/**
 * Persons
 */
personListSubscription = function(find, options, per_page) {
	var handle = Meteor.subscribeWithPagination('pubsub_person_list', find, options, per_page);
	handle.fetch = function() {
		var ourFind = _.isFunction(find) ? find() : find;
		return limitDocuments(Persons.find(ourFind, options), handle.loaded());
	}
	return handle;
};
personsHandle = personListSubscription(
	{},
	{sort: {name: 1}},
	Meteor.MyClientModule.appConfig.pageLimit
);

movieListSubscription = function(find, options, per_page) {
	var handle = Meteor.subscribeWithPagination('pubsub_movie_list', find, options, per_page);
	handle.fetch = function() {
		var ourFind = _.isFunction(find) ? find() : find;
		return limitDocuments(Movies.find(ourFind, options), handle.loaded());
	}
	return handle;
};
moviesHandle = movieListSubscription(
	{},
	{sort: {title: 1}},
	Meteor.MyClientModule.appConfig.pageLimit
);

/**
 * layout template JS
 */
Template.layout.helpers({
	hasSidebar: function() {
		return Session.get('has_sidebar');
	},
	mainDivClass: function() {
		return (Session.get('has_sidebar')) ? "col-sm-8" : "col-sm-12";
	}
});

/*
 * set debug=true in "/lib/client_module.js" to log template render counts to console.
 * Set as last statement in "main.js"
 */
Meteor.MyClientModule.performanceLogRenders();
