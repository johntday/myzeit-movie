Template.tmplSortedMovies.helpers({
    options: function() {
        return {
	        reactive: true,
	        selector: {title: {$regex: Session.get('search_text'), $options: 'i'}},
            sort: {title: 1},
            handle: moviesHandle
        }
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
//Template.tmplSortedMovies_updated.helpers({
//	options: function() {
//		return {
//			reactive: true,
//			selector: {},
//			sort: {release_date: 1},
//			handle: moviesSortUpdatedHandle
//		}
//	},
//	breadcrumbs: function() {
//		Session.set('breadcrumbs', {breadcrumbs: [
//			{title:"home", link:"/", isActive:false},
//			{title:"SciFi", link:"/sciFiMovies", isActive:true}
//		]});
//		return Session.get("breadcrumbs");
//	}
//});
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

/*
Template.tmplMoviesList.rendered = function() {
    var self = this.data;
    $(this.find('.load-more')).waypoint(function() {
            Meteor.setTimeout(function(){
	            //if ( !(self.handle.ready() && Movies.find().count() < self.handle.loaded()) ) {
		            self.handle.loadNextPage();
	            //}
            }, 1000);
        }, {offset: function() {
            return $(window).height() - $(this).height();
        }}
    );
};
*/