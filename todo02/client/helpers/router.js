Router.configure({
	//layoutTemplate : 'layout', //v0.6.0
	layout : 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'not_found',
	yieldTemplates: {
		//'footer': { to: 'footer' },
		//'tmplHeader': { to: 'header' }
	}
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
	this.route('tmpl_sorted_persons_list' ,{path: '/persons'});
	this.route('tmpl_sorted_timeline_list',{path: '/timelines'});
	this.route('tmpl_about'               ,{path: '/about'});
	this.route('tmpl_help'                ,{path: '/help'});
	this.route('tmpl_settings'            ,{path: '/settings'});
	this.route('tmplSortedUsers'          ,{path: '/admin/users'});
	this.route('tmpl_movie_add'           ,{path: '/movieAdd'});
	this.route('tmpl_person_add'          ,{path: '/personAdd'});
	this.route('tmpl_movie_favs'          ,{path: '/favs'});
//	this.route('tmpl_admin_stats'         ,{path: '/admin_stats'});

	this.route('tmpl_admin_stats', {
		path  : '/admin/stats',
		waitOn: function ()
		{
			var user = Meteor.user();
			if (! isAdmin(user)) {
				throwError('You must be an Administrator to use the "tmpl_admin_stats" template');
				return false;
			}
			return Meteor.subscribe('pubsub_movie_status_pending');
		},
		data  : function ()
		{
			var movie_pending_cnt = Movies.find({status: STATUS_PENDING}).count();
			return {movie_pending_cnt: movie_pending_cnt};
		}
	});

	this.route('tmpl_person_detail', {
		path  : '/person/:_id',
		waitOn: function ()
		{
			updateClickCnt(Persons, this.params._id);
			Session.set('selected_person_id', this.params._id);
			return Meteor.subscribe('pubsub_selected_person', this.params._id);
		},
		data  : function ()
		{
			var person = Persons.findOne(this.params._id);
			Session.set('breadcrumbs', {breadcrumbs: [
				{title:"home", link:"/", isActive:false},
				{title:"People", link:"/persons", isActive:false},
				{title:person.name, link:"", isActive:true}
			]});
			return person;
		}
	});

	this.route('tmplMovieDetail', {
		path  : '/sciFiMovies/:_id',
		waitOn: function ()
		{
			updateClickCnt(Movies, this.params._id);
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
			Meteor.call('clickedMovieByMyMovieId', this.params.mymovie_id);
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
			//updateClickCnt(MovieTimelines, this.params._id);
			Session.set("is_example_timeline", false);
			Session.set('selected_movie_id', this.params._id);
			Meteor.subscribe('pubsub_selected_movie', this.params._id);
			return Meteor.subscribe('pubsub_user_movie_timeline_list', this.params._id, Meteor.userId());
		},
		data  : function ()
		{
			return MovieTimelines.find({movieId: this.params._id, userId: { $in: ["admin", Meteor.userId()] } } );
		}
	});

	this.route('tmplMovieCastList', {
		path  : '/sciFiMovies/cast/:_id',
		waitOn: function ()
		{
			updateClickCnt(Movies, this.params._id);
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
			updateClickCnt(Movies, this.params._id);
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

	this.route('tmplMoviePoster', {
		path  : '/sciFiMovies/poster/:_id',
		waitOn: function ()
		{
			updateClickCnt(Movies, this.params._id);
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
			updateClickCnt(MovieTimelines, this.params._id);
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
