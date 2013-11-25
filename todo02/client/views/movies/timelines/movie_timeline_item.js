Template.tmplTimelineItem.helpers({
    thumbnail: function() {
	    return (this.posters && this.posters.thumbnail) ? this.posters.thumbnail : "/img/notfound.png";
    },
	timelineLink: function() {
		return "/movieTimeline/" + this._id;
	},
	isFav: function() {
		return isFav(this.favs);
	},
	isAdmin: function() {
		return isAdmin(Meteor.user());
	},
	click_cnt: function() {
		return (this.click_cnt) ? this.click_cnt : 0;
	},
	favs_cnt: function() {
		return (this.favs_cnt && this.favs_cnt > -1) ? this.favs_cnt : 0;
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
