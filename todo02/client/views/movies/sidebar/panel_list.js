Template.tmplSortedMovies.helpers({
    options: function() {
        return {
	        reactive: true,
	        selector: {title: {$regex: Session.get('search_text'), $options: 'i'}},
            sort: {title: 1},
            handle: moviesHandle
        }
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMoviesList.helpers({
    movies: function() {
	    var i = 0;
        var options = {sort: this.sort, limit: this.handle.limit()};
	    //console.log("selector: "+JSON.stringify(this.selector));
        return Movies.find(this.selector, options).map(function(movie) {
	        movie._rank = i;
	        i += 1;
	        return movie;
        });
    },

    moviesReady: function() {
        return this.handle.ready();
    },

    allMoviesLoaded: function() {
	    //console.log("count: "+Movies.find().count());
	    //console.log("loaded: "+this.handle.loaded());
	    return this.handle.ready() &&
		    Movies.find().count() < this.handle.loaded();
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMoviesList.events({
    'click .load-more': function(e) {
        e.preventDefault();
        this.handle.loadNextPage();
    }
});
