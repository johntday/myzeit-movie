Session.setDefault('search_text', "");
Session.setDefault('editing_movie', false);

//Session.setDefault('selectedMovieId', null);

newPostsHandle = Meteor.subscribeWithPagination('newPosts', 10);
bestPostsHandle = Meteor.subscribeWithPagination('bestPosts', 10);

//Deps.autorun(function() {
	//Meteor.subscribe('comments', Session.get('currentPostId'));
	//Meteor.subscribe('selectedMovie', Session.get('selectedMovieId'));
//});

Meteor.subscribe('notifications');

moviesHandle = Meteor.subscribeWithPagination('tmplSortedMovies', Meteor.MyClientModule.appConfig.pageLimit);

// set debug=true in "/lib/client_module.js" to log template render counts to console
Meteor.MyClientModule.performanceLogRenders();
