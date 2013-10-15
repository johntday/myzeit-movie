Router.configure({
	layout         : 'layout',
	loadingTemplate: 'loading'
	//renderTemplates: {
		/* render the templated named 'footer' to the 'footer' yield */
		//'footer': { to: 'footer' },

		/* render the templated named 'header' to the 'header' yield */
		//'tmplHeader': { to: 'header' }

		/* render the template named sidebar to the 'sidebar' yield */
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

	this.route('tmplHome',         {path: '/'});
	this.route('tmplSortedMovies', {path: '/sciFiMovies'});
	this.route('tmpl_about',       {path: '/about'});
	this.route('tmpl_help',        {path: '/help'});
	this.route('tmpl_settings',    {path: '/settings'});

	this.route('tmplMoviePage', {
		path  : '/sciFiMovies/:_id',
		waitOn: function ()
		{
			Session.set('selected_movie_id', this.params._id);
			return Meteor.subscribe('pubsub_selected_movie', this.params._id) && Meteor.subscribe('pubsub_movie_timeline_list', this.params._id);
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
});
