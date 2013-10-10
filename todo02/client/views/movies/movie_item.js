Template.tmplMovieItem.helpers({
    domain: function() {
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    },
    thumbnail: function() {
        var base_url = 'http://d3gtl9l2a4fn1j.cloudfront.net/t/p/';
        var poster_size = 'w92';

        return base_url + poster_size + this.poster_path;
    },
	movieLink: function() {
		return "/sciFiMovies/" + this._id;
	}
});


Template.tmplMovieItem.rendered = function(){
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


Template.tmplMovieItem.events({
	'click .upvotable': function(e) {
		e.preventDefault();
		Meteor.call('upvote', this._id);
	}
});