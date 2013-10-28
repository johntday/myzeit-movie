Router.configure({
	layoutTemplate : 'layout',
	loadingTemplate: 'loading'
	//yieldTemplates: {
		//'footer': { to: 'footer' },
		//'tmplHeader': { to: 'header' }
		//'sidebar': { to: 'sidebar' }
	//}
});

Router.map(function ()
{
	this.route('bestPosts', {path: '/best'});
	this.route('newPosts', {path: '/new'});
	this.route('postPage', {
		path  : '/posts/:_id',
		waitOn: function ()
		{
			return Meteor.subscribe('singlePost', this.params._id);
		},
		data  : function ()
		{
			return Posts.findOne(this.params._id);
		}
	});

	this.route('tmplHome'                 ,{path: '/'});
	this.route('tmplSortedMovies'         ,{path: '/sciFiMovies'});
	this.route('tmpl_about'               ,{path: '/about'});
	this.route('tmpl_help'                ,{path: '/help'});
	this.route('tmpl_settings'            ,{path: '/settings'});
	this.route('tmpl_users_manage'        ,{path: '/usersManage'});

	this.route('tmplMovieDetail', {
		path  : '/sciFiMovies/:_id',
		waitOn: function ()
		{
			Session.set('selected_movie_id', this.params._id);
			return Meteor.subscribe('pubsub_selected_movie', this.params._id);
		},
		data  : function ()
		{
			var movie = Movies.findOne(this.params._id);
			Session.set('breadcrumbs', {breadcrumbs: [
				{title:"home", link:"/", isActive:false},
				{title:"SciFi", link:"/sciFiMovies", isActive:false},
				{title:movie.title, link:"", isActive:true}
			]});
			return movie;
		}
	});

	this.route('tmplMovieDetail', {
		path  : '/m/:mymovie_id',
		waitOn: function ()
		{
			return Meteor.subscribe('pubsub_selected_movie_alternateId', this.params.mymovie_id);
		},
		data  : function ()
		{
			var movie = Movies.findOne({mymovie_id: this.params.mymovie_id});
			Session.set('breadcrumbs', {breadcrumbs: [
				{title:"home", link:"/", isActive:false},
				{title:"SciFi", link:"/sciFiMovies", isActive:false},
				{title:movie.title, link:"", isActive:true}
			]});
			Session.set('selected_movie_id', movie._id);
			return movie;
		}
	});

	this.route('tmplMovieTimelineList', {
		path  : '/sciFiMovies/timelines/:_id',
		waitOn: function ()
		{
			Session.set("is_example_timeline", false);
			Session.set('selected_movie_id', this.params._id);
			Meteor.subscribe('pubsub_selected_movie', this.params._id);
			return Meteor.subscribe('pubsub_user_movie_timeline_list', this.params._id, Meteor.userId());
		},
		data  : function ()
		{
			return MovieTimelines.find({movieId: this.params._id, userId: { $in: ["admin", Meteor.userId()] } } )
				.map(function(movieTimeline) {
					movieTimeline.createdAgo = moment(movieTimeline.created).startOf('hour').fromNow();
					return movieTimeline;
				});
		}
	});

	this.route('tmplMovieCastList', {
		path  : '/sciFiMovies/cast/:_id',
		waitOn: function ()
		{
			Session.set('selected_movie_id', this.params._id);
			return Meteor.subscribe('pubsub_selected_movie', this.params._id);
		},
		data  : function ()
		{
			return Movies.findOne(this.params._id);
		}
	});

	this.route('tmplMovieFactsList', {
		path  : '/sciFiMovies/facts/:_id',
		waitOn: function ()
		{
			Session.set('selected_movie_id', this.params._id);
			return Meteor.subscribe('pubsub_selected_movie', this.params._id);
		},
		data  : function ()
		{
			return Movies.findOne(this.params._id);
		}
	});

	this.route('tmplMovieTimeline', {
		path  : '/movieTimeline/:_id',
		waitOn: function ()
		{
			Session.set('selected_movie_id', this.params._id);
			return Meteor.subscribe('pubsub_selected_movie_timeline', this.params._id);
		},
		data  : function ()
		{
			return MovieTimelines.findOne(this.params._id);
		}
	});

	this.route('tmplMovieTimelineList', {
		path  : '/sciFiMovies/timelines/example/:mymovie_id',
		waitOn: function ()
		{
			Session.set("is_example_timeline", true);
			return Meteor.subscribe('pubsub_selected_movie_alternateId', this.params.mymovie_id)
				&& Meteor.subscribe('pubsub_selected_movie_timeline_alternateId', this.params.mymovie_id);
		},
		data  : function ()
		{
			var m = Movies.findOne({mymovie_id: this.params.mymovie_id});
			Session.set('breadcrumbs', {breadcrumbs: [
				{title:"home", link:"/", isActive:false},
				{title:"SciFi", link:"/sciFiMovies", isActive:false},
				{title:m.title, link:"", isActive:true}
			]});
			Session.set('selected_movie_id', m._id);
			return MovieTimelines.find({movieId: m._id});
		}
	});

});
