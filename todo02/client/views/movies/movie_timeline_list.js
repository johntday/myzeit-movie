Template.tmplSortedMovieTimelineList.helpers({
	options: function() {
		return {
			reactive: true,
			selector: {},
			sort: {created: 1},
			handle: movieTimelinesHandle
		}
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMovieTimelineList.helpers({
	movies: function() {
		var i = 0;
		var options = {sort: this.sort, limit: this.handle.limit()};
		//console.log("selector: "+JSON.stringify(this.selector));
		return MovieTimelines.find(this.selector, options).map(function(movie) {
			movie.createdAgo = moment(movie.created).startOf('hour').fromNow();

			movie._rank = i;
			i += 1;
			return movie;
		});
	},
	moviesReady: function() {
		return this.handle.ready();
	},
	allMoviesLoaded: function() {
		//console.log("count: "+MovieTimelines.find().count());
		//console.log("loaded: "+this.handle.loaded());
		return this.handle.ready() &&
			MovieTimelines.find().count() < this.handle.loaded();
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMovieTimelineList.events({
	'click .load-more': function(e) {
		e.preventDefault();
		this.handle.loadNextPage();
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMovieTimeline2.helpers({
	movieLink: function() {
		return "/sciFiMovies/" + this._id;
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMovieTimeline2.rendered = function(){
	// animate post from previous position to new position
	var instance = this;
	var rank = instance.data._rank;
	var $this = $(this.firstNode);
	var postHeight = 80;
	var newPosition = rank * postHeight;

	// if element has a currentPosition (i.e. it's not the first ever render)
	if (typeof(instance.currentPosition) !== 'undefined') {
		var previousPosition = instance.currentPosition;
		// calculate difference between old position and new position and send element there
		var delta = previousPosition - newPosition;
		$this.css("top", delta + "px");
	} else {
		// it's the first ever render, so hide element
		$this.addClass("invisible");
	}

	// let it draw in the old position, then..
	Meteor.defer(function() {
		instance.currentPosition = newPosition;
		// bring element back to its new original position
		$this.css("top",  "0px").removeClass("invisible");
	});
};
