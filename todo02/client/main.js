/**
 * SESSION VARIABLE DEFAULTS
 */
Session.setDefault('search_text', '');
Session.setDefault('form_update', false);
Session.setDefault('form_create', false);
Session.setDefault('selected_movie_id', null);
Session.setDefault('breadcrumbs', null);
Session.setDefault('has_sidebar', true);
/*------------------------------------------------------------------------------------------------------------------------------*/
newPostsHandle  = Meteor.subscribeWithPagination('newPosts', 10);
bestPostsHandle = Meteor.subscribeWithPagination('bestPosts', 10);

//Deps.autorun(function() {
//	Meteor.subscribe('selectedMovieTimeline', Session.get('selected_movie_id'));
//	Meteor.subscribe('pubsub_user_movie_timeline_list', Session.get('selected_movie_id'), Meteor.userId());
//});

/**
 * Notifications
 */
Meteor.subscribe('pubsub_notification_list');
/**
 * Movies
 */
moviesHandle             = Meteor.subscribeWithPagination('pubsub_movie_list',  Meteor.MyClientModule.appConfig.pageLimit);
//moviesSortUpdatedHandle  = Meteor.subscribeWithPagination('pubsub_movie_list_sortUpdated',  5);
/**
 * Persons
 */
personsHandle = Meteor.subscribeWithPagination('pubsub_person_list', Meteor.MyClientModule.appConfig.pageLimit);

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
