Session.setDefault('search_text', '');
Session.setDefault('form_update', false);
Session.setDefault('form_create', false);
Session.setDefault('selected_movie_id', null);
Session.setDefault('breadcrumbs', null);
/*------------------------------------------------------------------------------------------------------------------------------*/
newPostsHandle  = Meteor.subscribeWithPagination('newPosts', 10);
bestPostsHandle = Meteor.subscribeWithPagination('bestPosts', 10);

//Deps.autorun(function() {
//	Meteor.subscribe('selectedMovieTimeline', Session.get('selected_movie_id'));
//	Meteor.subscribe('pubsub_user_movie_timeline_list', Session.get('selected_movie_id'), Meteor.userId());
//});

                       Meteor.subscribe('pubsub_notification_list');
moviesHandle  = Meteor.subscribeWithPagination('pubsub_movie_list',  Meteor.MyClientModule.appConfig.pageLimit);
personsHandle = Meteor.subscribeWithPagination('pubsub_person_list', Meteor.MyClientModule.appConfig.pageLimit);

//movieTimelinesHandle = Meteor.subscribeWithPagination('pubsub_movie_timeline_list', Meteor.MyClientModule.appConfig.pageLimit);

/*
 * set debug=true in "/lib/client_module.js" to log template render counts to console
 */
Meteor.MyClientModule.performanceLogRenders();
