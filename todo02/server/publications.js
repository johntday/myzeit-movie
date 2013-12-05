/**
 * Notifications
 */
Meteor.publish('pubsub_notification_list', function(admin) {
	var userId = (admin) ? "admin" : this.userId;
	return Notifications.find({userId: userId});
});

/**
 * Movies
 */
Meteor.publish('pubsub_movie_list', function(query, options, limit) {
	options = options || {};
	options.limit = limit;
	return Movies.find(query || {}, options);
});
Meteor.publish('pubsub_selected_movie', function(id) {
	return Movies.find(id);
});
Meteor.publish('pubsub_movie_favs', function(query, options, limit) {
	options = options || {};
	options.limit = limit;
	return Movies.find(query || {}, options);
});
Meteor.publish('pubsub_movie_favs_5', function() {
	return Movies.find({favs: this.userId}, {sort: {title:1}, limit:5});
});
Meteor.publish('pubsub_movie_stars', function(query, options, limit) {
	options = options || {};
	options.limit = limit;
	return Movies.find(query || {}, options);
});
Meteor.publish('pubsub_movie_stars_5', function() {
	return Movies.find({stars: this.userId}, {sort: {title:1}, limit:5});
});
Meteor.publish('pubsub_selected_movie_alternateId', function(mymovie_id) {
	return Movies.find({mymovie_id: mymovie_id});
});

/**
 * Persons
 */
Meteor.publish('pubsub_person_list', function(query, options, limit) {
	options = options || {};
	options.limit = limit;
	return Persons.find(query || {}, options);
});
Meteor.publish('pubsub_selected_person', function(id) {
	return Persons.find(id);
});

/**
 * Movie Timelines
 */
Meteor.publish('pubsub_user_movie_timeline_list', function(movieId, userId) {
	return movieId && MovieTimelines.find({movieId: movieId, userId: { $in: ["admin", userId] } }, {limit: 2} );
});
Meteor.publish('pubsub_selected_movie_timeline', function(id) {
	return MovieTimelines.find(id);
});
Meteor.publish('pubsub_selected_movie_timeline_alternateId', function(mymovie_id) {
	return MovieTimelines.find({mymovie_id: mymovie_id});
});
Meteor.publish('pubsub_movie_timelines', function(query, options, limit) {
	options = options || {};
	options.limit = limit;
	return MovieTimelines.find(query || {}, options);
});
Meteor.publish('pubsub_movie_timelines_5', function() {
	return MovieTimelines.find({}, findOptions(movieTimelineSort['click_cnt'], 5) );
});

/**
 * Facts
 */
Meteor.publish('pubsub_movie_facts_list', function(query, options, limit) {
	options = options || {};
	options.limit = limit;
	return Facts.find(query || {}, options);
});
Meteor.publish('pubsub_selected_fact', function(id) {
	return Facts.find(id);
});

/**
 * Users
 */
Meteor.publish('pubsub_users_list', function(query, options, limit) {
	options = options || {};
	options.limit = limit;
	return Meteor.users.find(query || {}, options);
});


/**
 * Admin
 */
Meteor.publish('pubsub_movie_status_pending', function() {
	return Movies.find({status: STATUS_PENDING});
});
