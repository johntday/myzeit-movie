Session.setDefault('search_text', '');
Session.setDefault('editing_movie', false);
Session.setDefault('selected_movie_id', null);

newPostsHandle = Meteor.subscribeWithPagination('newPosts', 10);
bestPostsHandle = Meteor.subscribeWithPagination('bestPosts', 10);

//Deps.autorun(function() {
//	Meteor.subscribe('selectedMovieTimeline', Session.get('selected_movie_id'));
//});

Meteor.subscribe('notifications');

moviesHandle = Meteor.subscribeWithPagination('tmplSortedMovies', Meteor.MyClientModule.appConfig.pageLimit);

movieTimelinesHandle = Meteor.subscribeWithPagination('tmplSortedMovieTimelineList', Meteor.MyClientModule.appConfig.pageLimit);

// set debug=true in "/lib/client_module.js" to log template render counts to console
Meteor.MyClientModule.performanceLogRenders();
