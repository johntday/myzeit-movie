
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
	return Movies.find({favs: this.userId}, {limit: 5});
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
	return id && MovieTimelines.find(id);
});
Meteor.publish('pubsub_selected_movie_timeline_alternateId', function(mymovie_id) {
	return mymovie_id && MovieTimelines.find({mymovie_id: mymovie_id});
});
