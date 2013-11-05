Template.tmplSortedMovies.helpers({
	moviesHandle: function() {
		return moviesHandle;
	},
	breadcrumbs: function() {
		Session.set('breadcrumbs', {breadcrumbs: [
			{title:"home", link:"/", isActive:false},
			{title:"SciFi", link:"/sciFiMovies", isActive:true}
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
