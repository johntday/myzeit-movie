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

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});


Meteor.publish('tmplSortedMovies', function(limit) {
	return Movies.find({}, {sort: {title: 1}, limit: limit});
});

Meteor.publish('selectedMovie', function(id) {
	return id && Movies.find(id);
});
