Template.tmpl_favs_sort_select.helpers({
	breadcrumbs: function() {
		return [
			{title:"home", link:"/", isActive:false},
			{title:"Favs", link:"/favs", isActive:true}
		];
	},
	option_value: function() {
		return Session.get('favs_sort');
	},
	options: function() {
		return getMovieSortingOptions();
	}
});
Template.tmpl_favs_sort_select.events({
	'click #favs-sort': function(e) {
		e.preventDefault();
		var $selector = $('#favs-sort');
		if ( Session.get('favs_sort') !== $selector.val() ) {
			Session.set('favs_sort', $selector.val());
			Router.go('/favs');
		}
		$selector = null;
	}
});

/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_movie_favs.helpers({
	movieFavsHandle: function() {
		return movieFavsHandle;
	},
	breadcrumbs: function() {
		Session.set('breadcrumbs', {breadcrumbs: [
			{title:"home", link:"/", isActive:false},
			{title:"Favs", link:"/favs", isActive:true}
		]});
		return Session.get("breadcrumbs");
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
