Template.tmplSortedMovies.helpers({
	moviesHandle: function() {
		return moviesHandle;
	}
});
Template.tmpl_movie_sort_select.helpers({
	breadcrumbs: function() {
		return [
			{title:"home", link:"/", isActive:false},
			{title:"Movies", link:"/sciFiMovies", isActive:true}
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
