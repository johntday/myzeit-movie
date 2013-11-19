Template.tmplMovieItem.helpers({
    thumbnail: function() {
	    return (this.posters && this.posters.thumbnail) ? this.posters.thumbnail : "/img/notfound.png";
    },
	movieLink: function() {
		return "/sciFiMovies/" + this._id;
	},
	isFav: function() {
		return isFav(this.favs);
	},
	hasSeen: function() {
		return hasSeen(this.seen);
	},
	yearDisplay: function() {
		if (this.year && this.year != -1)
			return this.year;
		if (this.release_date)
			return this.release_date.substring(0,4);
		else
			'';
	},
	isAdmin: function() {
		return isAdmin(Meteor.user());
	},
	critics_score: function() {
		if (!this.ratings || !this.ratings.critics_score || this.ratings.critics_score === -1) return 'NA';
		return this.ratings.critics_score+'%';
	},
	click_cnt: function() {
		return (this.click_cnt) ? this.click_cnt : 0;
	},
	statusLabel: function() {
		return getMovieStatusLabel(this.status);
	},
	favs_cnt: function() {
		return (this.favs_cnt && this.favs_cnt > -1) ? this.favs_cnt : 0;
	},
	seen_cnt: function() {
		return (this.seen_cnt && this.seen_cnt > -1) ? this.seen_cnt : 0;
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
//Template.tmplMovieItem.rendered = function(){
//	// animate post from previous position to new position
//	var instance = this;
//	var rank = instance.data._rank;
//	var $this = $(this.firstNode);
//	var postHeight = 80;
//	var newPosition = rank * postHeight;
//
//	// if element has a currentPosition (i.e. it's not the first ever render)
//	if (typeof(instance.currentPosition) !== 'undefined') {
//		var previousPosition = instance.currentPosition;
//		// calculate difference between old position and new position and send element there
//		var delta = previousPosition - newPosition;
//		$this.css("top", delta + "px");
//	} else {
//		// it's the first ever render, so hide element
//		$this.addClass("invisible");
//	}
//
//	// let it draw in the old position, then..
//	Meteor.defer(function() {
//		instance.currentPosition = newPosition;
//		// bring element back to its new original position
//		$this.css("top",  "0px").removeClass("invisible");
//	});
//};
/*------------------------------------------------------------------------------------------------------------------------------*/
