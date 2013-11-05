Template.tmplMoviePage.helpers({
	activeTab: function() {
		return Session.get('tab');
	},
	activeTabDefault: function() {
		return "Movie";
	},
	breadcrumbs: function() {
		return {breadcrumbs: [
			{title:"home", link:"/", isActive:false},
			{title:"SciFi", link:"/sciFiMovies", isActive:false},
			{title:"Title", link:"", isActive:true}
		]};
	},
	tabList: function() {
		return [
			{title: "Movie", link: "/sciFiMovies/"+this._id},
			{title: "Timelines", link: "/sciFiMovies/timelines/"+this._id},
			{title: "Cast", link: "/sciFiMovies/cast/"+this._id},
			{title: "Facts", link: "/sciFiMovies/facts/"+this._id}
		];
	}
});
