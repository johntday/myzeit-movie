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
Session.setDefault('movie_sort', 'title');
Session.setDefault('person_sort', 'name');
Session.setDefault('favs_sort', 'title');
Session.setDefault('stars_sort', 'title');
Session.setDefault('facts_sort', 'click_cnt');
Session.setDefault('movie_timeline_sort', 'title');
Session.setDefault('user_sort', 'username');
/*------------------------------------------------------------------------------------------------------------------------------*/
/**
 * Notifications
 */
if(Meteor.userId() != null) {
	Meteor.subscribe('pubsub_notification_list', isAdmin());
	Meteor.subscribe('pubsub_settings');
}
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
Deps.autorun(function(){
	personsHandle = personListSubscription(
		personQuery( Session.get('search_text') ),
		personSort[ Session.get('person_sort') ],
		Meteor.MyClientModule.appConfig.pageLimit
	);
});

/**
 * Movies
 */
movieListSubscription = function(find, options, per_page) {
	var handle = Meteor.subscribeWithPagination('pubsub_movie_list', find, options, per_page);
	handle.fetch = function() {
		var ourFind = _.isFunction(find) ? find() : find;
		return limitDocuments(Movies.find(ourFind, options), handle.loaded());
	}
	return handle;
};
Deps.autorun(function(){
	moviesHandle = movieListSubscription(
		movieQuery( Session.get('search_text') ),
		movieSort[ Session.get('movie_sort') ],
		Meteor.MyClientModule.appConfig.pageLimit
	);
});

/**
 * Movie Favs
 */
movieFavsSubscription = function(find, options, per_page) {
	var handle = Meteor.subscribeWithPagination('pubsub_movie_favs', find, options, per_page);
	handle.fetch = function() {
		var ourFind = _.isFunction(find) ? find() : find;
		return limitDocuments(Movies.find(ourFind, options), handle.loaded());
	}
	return handle;
};
Deps.autorun(function(){
	Meteor.subscribe('pubsub_movie_favs_5');

	movieFavsHandle = movieFavsSubscription(
		favsQuery( Session.get('search_text') ),
		movieSort[ Session.get('favs_sort') ],
		Meteor.MyClientModule.appConfig.pageLimit
	);
});

/**
 * Movie Starred
 */
movieStarsSubscription = function(find, options, per_page) {
	var handle = Meteor.subscribeWithPagination('pubsub_movie_stars', find, options, per_page);
	handle.fetch = function() {
		var ourFind = _.isFunction(find) ? find() : find;
		return limitDocuments(Movies.find(ourFind, options), handle.loaded());
	}
	return handle;
};
Deps.autorun(function(){
	Meteor.subscribe('pubsub_movie_stars_5');

	movieStarsHandle = movieStarsSubscription(
		starsQuery( Session.get('search_text') ),
		movieSort[ Session.get('stars_sort') ],
		Meteor.MyClientModule.appConfig.pageLimit
	);
});

/**
 * Movie Facts
 */
movieFactsSubscription = function(find, options, per_page) {
	var handle = Meteor.subscribeWithPagination('pubsub_movie_facts_list', find, options, per_page);
	handle.fetch = function() {
		var ourFind = _.isFunction(find) ? find() : find;
		return limitDocuments(Facts.find(ourFind, options), handle.loaded());
	}
	return handle;
};
Deps.autorun(function(){
	movieFactsHandle = movieFactsSubscription(
		factsQuery( Session.get('selected_movie_id') ),
		factsSort[ Session.get('facts_sort') ],
		Meteor.MyClientModule.appConfig.pageLimit
	);
});

/**
 * Movie Timelines
 */
movieTimelinesSubscription = function(find, options, per_page) {
	var handle = Meteor.subscribeWithPagination('pubsub_movie_timelines', find, options, per_page);
	handle.fetch = function() {
		var ourFind = _.isFunction(find) ? find() : find;
		return limitDocuments(MovieTimelines.find(ourFind, options), handle.loaded());
	}
	return handle;
};
Deps.autorun(function(){
	Meteor.subscribe('pubsub_movie_timelines_5');

	movieTimelinesHandle = movieTimelinesSubscription(
		movieTimelinesQuery( Session.get('search_text') ),
		movieTimelineSort[ Session.get('movie_timeline_sort') ],
		Meteor.MyClientModule.appConfig.pageLimit
	);
});

/**
 * Users
 */
usersSubscription = function(find, options, per_page) {
	var handle = Meteor.subscribeWithPagination('pubsub_users_list', find, options, per_page);
	handle.fetch = function() {
		var ourFind = _.isFunction(find) ? find() : find;
		return limitDocuments(Meteor.users.find(ourFind, options), handle.loaded());
	}
	return handle;
};
Deps.autorun(function(){
	if(Meteor.userId() != null && isAdmin(Meteor.user())) {
		usersHandle = usersSubscription(
			usersQuery( Session.get('search_text') ),
			usersSort[ Session.get('user_sort') ],
			Meteor.MyClientModule.appConfig.pageLimit
		);
	}
});


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
