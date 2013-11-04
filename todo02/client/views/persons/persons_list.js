Template.tmpl_sorted_persons_list.helpers({
	personsHandle: function() {
		return personsHandle;
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
Template.tmpl_persons_list.events({
	'click #persons.load-more': function(e) {
		e.preventDefault();
		this.loadNextPage();
	}
});
