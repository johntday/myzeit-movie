Meteor.publish('newPosts', function(limit) {
  return Posts.find({}, {sort: {submitted: -1}, limit: limit});
});
Meteor.publish('bestPosts', function(limit) {
  return Posts.find({}, {sort: {votes: -1, submitted: -1}, limit: limit});
});
Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id);
});
Meteor.publish('comments', function(postId) {
  return Comments.find({postId: postId});
});


Meteor.publish('pubsub_notification_list', function() {
  return Notifications.find({userId: this.userId});
});
Meteor.publish('pubsub_movie_list', function(limit) {
	return Movies.find({}, {sort: {title: 1}, limit: limit});
});
Meteor.publish('pubsub_movie_timeline_list', function(movieId) {
	return MovieTimelines.find({movieId: movieId}, {sort: {created: 1}, limit: 2});
});
Meteor.publish('pubsub_selected_movie', function(id) {
	return id && Movies.find(id);
});
Meteor.publish('pubsub_selected_movie_timeline', function(id) {
	return id && MovieTimelines.find(id);
});
Meteor.publish('pubsub_user_movie_timeline', function(movieId, userId) {
	return MovieTimelines.find({movieId: movieId, userId: userId});
});
