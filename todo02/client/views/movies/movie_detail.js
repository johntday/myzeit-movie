Template.tmplMovieDetail.helpers({
	isAdmin: function() {
		return isAdmin();
	},
	isReadOnly: function() {
		return Meteor.MyClientModule.isReadOnly();
	},
	breadcrumbs: function() {
		return Session.get("breadcrumbs");
	},
	tabs: function() {
		Meteor.MyClientModule.scrollToTopOfPageFast();
		return {tabs: [
			{title:"Movie", link:null, isActive:true},
			{title:"Timelines", link:"/sciFiMovies/timelines/"+this._id, isActive:false}
		]};
	}
});
