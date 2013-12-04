Template.tmpl_stars_sort_select.helpers({
	breadcrumbs: function() {
		return [
			{title:"home", link:"/", isActive:false},
			{title:"Starred", link:"/stars", isActive:true}
		];
	},
	option_value: function() {
		return Session.get('stars_sort');
	},
	options: function() {
		return getMovieSortingOptions();
	}
});
Template.tmpl_stars_sort_select.events({
	'click #stars-sort': function(e) {
		e.preventDefault();
		var $selector = $('#stars-sort');
		if ( Session.get('stars_sort') !== $selector.val() ) {
			Session.set('stars_sort', $selector.val());
			Router.go('/stars');
		}
		$selector = null;
	}
});

/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_movie_stars.helpers({
	movieStarsHandle: function() {
		return movieStarsHandle;
	},
	breadcrumbs: function() {
		Session.set('breadcrumbs', {breadcrumbs: [
			{title:"home", link:"/", isActive:false},
			{title:"Stars", link:"/stars", isActive:true}
		]});
		return Session.get("breadcrumbs");
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
