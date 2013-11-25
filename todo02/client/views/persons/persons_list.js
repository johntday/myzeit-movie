Template.tmpl_sorted_persons_list.helpers({
	personsHandle: function() {
		return personsHandle;
	},
	breadcrumbs: function() {
		Session.set('breadcrumbs', {breadcrumbs: [
			{title:"home", link:"/", isActive:false},
			{title:"People", link:"/persons", isActive:true}
		]});
		return Session.get("breadcrumbs");
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_persons_list.helpers({
	persons: function() {
		return this.fetch();
	},
	personsReady: function() {
		return this.ready();
	},
	allPersonsLoaded: function() {
		allPostsLoaded = this.fetch().length < this.loaded();
		Session.set('allPostsLoaded', allPostsLoaded);
		return allPostsLoaded;
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_person_sort_select.helpers({
	breadcrumbs: function() {
		return [
			{title:"home", link:"/", isActive:false},
			{title:"People", link:"/persons", isActive:true}
		];
	},
	option_value: function() {
		return Session.get('person_sort');
	},
	options: function() {
		return getPersonSortingOptions();
	}
});
Template.tmpl_person_sort_select.events({
	'click #person-sort': function(e) {
		e.preventDefault();
		var $selector = $('#person-sort');
		if ( Session.get('person-sort') !== $selector.val() ) {
			Session.set('person-sort', $selector.val());
			Router.go('/persons');
		}
		$selector = null;
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_persons_list.events({
	'click #persons.load-more': function(e) {
		e.preventDefault();
		this.loadNextPage();

		Meteor.MyClientModule.scrollToBottomOfPageFast( $('div[class="post"]').last() );
	}
});
