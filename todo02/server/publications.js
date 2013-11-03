//Meteor.publish('newPosts', function(limit) {
//  return Posts.find({}, {sort: {submitted: -1}, limit: limit});
//});
//Meteor.publish('bestPosts', function(limit) {
//  return Posts.find({}, {sort: {votes: -1, submitted: -1}, limit: limit});
//});
//Meteor.publish('singlePost', function(id) {
//  return id && Posts.find(id);
//});
//Meteor.publish('comments', function(postId) {
//  return Comments.find({postId: postId});
//});

/**
 * Notifications
 */
Meteor.publish('pubsub_notification_list', function() {
  return Notifications.find({userId: this.userId});
});

/**
 * Movies
 */
Meteor.publish('pubsub_movie_list', function(limit) {
	return Movies.find({}, {sort: {title: 1}, limit: limit});
});
Meteor.publish('pubsub_movie_list_sortUpdated', function(limit) {
	return Movies.find({}, {sort: {release_date: 1}, limit: limit});
});
Meteor.publish('pubsub_selected_movie', function(id) {
	return id && Movies.find(id);
});
Meteor.publish('pubsub_selected_movie_alternateId', function(mymovie_id) {
	return mymovie_id && Movies.find({mymovie_id: mymovie_id});
});
//Meteor.publish('pubsub_movie_list_sortedUpdatedDesc', function(limit) {
//	return Movies.find({}, {sort: {updated: -1, created: -1}, limit: limit});
//});

/**
 * Persons
 */
Meteor.publish('pubsub_person_list', function(limit) {
	return Persons.find({}, {sort: {name: 1}, limit: limit});
});
Meteor.publish('pubsub_selected_person', function(id) {
	return id && Persons.find(id);
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
