Template.tmpl_sorted_timeline_list.helpers({
	movieTimelinesHandle: function() {
		return movieTimelinesHandle;
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_timeline_sort_select.helpers({
	breadcrumbs: function() {
		return [
			{title:"home", link:"/", isActive:false},
			{title:"Timelines", link:"/timelines", isActive:true}
		];
	},
	option_value: function() {
		return Session.get('movie_timeline_sort');
	},
	options: function() {
		return getTimelineSortingOptions();
	}
});
Template.tmpl_timeline_sort_select.events({
	'click #movie_timeline_sort': function(e) {
		e.preventDefault();
		var $selector = $('#movie_timeline_sort');
		if ( Session.get('movie_timeline_sort') !== $selector.val() ) {
			Session.set('movie_timeline_sort', $selector.val());
			Router.go('/timelines');
		}
		$selector = null;
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplTimelinesList.helpers({
	timelines: function() {
		return this.fetch();
	},
	ready: function() {
		return this.ready();
	},
	allLoaded: function() {
		return ( this.fetch().length < this.loaded() );
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplTimelinesList.events({
    'click .load-more': function(e) {
        e.preventDefault();
	    this.loadNextPage();

	    Meteor.MyClientModule.scrollToBottomOfPageFast( $('div[class="post"]').last() );
    }
});
