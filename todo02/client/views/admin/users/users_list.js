Template.tmplSortedUsers.helpers({
	usersHandle: function() {
		return usersHandle;
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_user_sort_select.helpers({
	breadcrumbs: function() {
		return [
			{title:"home", link:"/", isActive:false},
			{title:"users", link:"/admin/users", isActive:true}
		];
	},
	option_value: function() {
		return Session.get('user_sort');
	},
	options: function() {
		return getUserSortingOptions();
	}
});
Template.tmpl_user_sort_select.events({
	'click #user-sort': function(e) {
		e.preventDefault();
		var $selector = $('#user-sort');
		if ( Session.get('user_sort') !== $selector.val() ) {
			Session.set('user_sort', $selector.val());
			Router.go('/admin/users');
		}
		$selector = null;
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplUsersList.helpers({
	users: function() {
		return this.fetch();
	},
	ready: function() {
		return this.ready();
	},
	allLoaded: function() {
		return ( this.fetch().length < this.loaded() );
	}
});
Template.tmplUsersList.events({
    'click .load-more': function(e) {
        e.preventDefault();
	    this.loadNextPage();

	    Meteor.MyClientModule.scrollToBottomOfPageFast( $('div[class="post"]').last() );
    }
});
