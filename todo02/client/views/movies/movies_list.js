Template.tmplSortedMovies.helpers({
	moviesHandle: function() {
		return moviesHandle;
	}
});
Template.tmpl_movie_sort_select.helpers({
	breadcrumbs: function() {
		return [
			{title:"home", link:"/", isActive:false},
			{title:"SciFi", link:"/sciFiMovies", isActive:true}
		];
	},
	option_value: function() {
		return Session.get('movie_sort');
	},
	options: function() {
		return getMovieSortingOptions();
	}
});
Template.tmpl_movie_sort_select.events({
	'click #movie-sort': function(e) {
		e.preventDefault();
		var $selector = $('#movie-sort');
		if ( Session.get('movie_sort') !== $selector.val() ) {
			Session.set('movie_sort', $selector.val());
			Router.go('/sciFiMovies');
		}
		$selector = null;
	}
});
Template.tmpl_favs_sort_select.helpers({
	breadcrumbs: function() {
		return [
			{title:"home", link:"/", isActive:false},
			{title:"Favs", link:"/favs", isActive:true}
		];
	},
	option_value: function() {
		return Session.get('favs_sort');
	},
	options: function() {
		return getMovieSortingOptions();
	}
});
Template.tmpl_favs_sort_select.events({
	'click #favs-sort': function(e) {
		e.preventDefault();
		var $selector = $('#favs-sort');
		if ( Session.get('favs_sort') !== $selector.val() ) {
			Session.set('favs_sort', $selector.val());
			Router.go('/favs');
		}
		$selector = null;
	}
});

/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_movie_favs.helpers({
	movieFavsHandle: function() {
//		movieFavsHandle = movieFavsSubscription(
//			{favs: Meteor.userId()},
//			{sort: {title: 1}},
//			Meteor.MyClientModule.appConfig.pageLimit
//		);
		return movieFavsHandle;
	},
	breadcrumbs: function() {
		Session.set('breadcrumbs', {breadcrumbs: [
			{title:"home", link:"/", isActive:false},
			{title:"Favs", link:"/favs", isActive:true}
		]});
		return Session.get("breadcrumbs");
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMoviesList.helpers({
	movies: function() {
		return this.fetch();
	},
	moviesReady: function() {
		return this.ready();
	},
	allMoviesLoaded: function() {
//		allPostsLoaded = this.fetch().length < this.loaded();
//		Session.set('allPostsLoaded', allPostsLoaded);
//		return allPostsLoaded;
		return ( this.fetch().length < this.loaded() );
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMoviesList.events({
    'click .load-more': function(e) {
        e.preventDefault();
	    this.loadNextPage();

	    Meteor.MyClientModule.scrollToBottomOfPageFast( $('div[class="post"]').last() );
    }
});
