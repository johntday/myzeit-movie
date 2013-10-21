Template.tmpl_sorted_persons_list.helpers({
	options: function() {
		return {
			reactive: true,
			selector: {name: {$regex: Session.get('search_text'), $options: 'i'}},
			sort: {name: 1},
			handle: personsHandle
		}
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_persons_list.helpers({
	persons: function() {
		var i = 0;
		var options = {sort: this.sort, limit: this.handle.limit()};
		return Persons.find(this.selector, options).map(function(person) {
			person._rank = i;
			i += 1;
			return person;
		});
	},
	personsReady: function() {
		return this.handle.ready();
	},
	allPersonsLoaded: function() {
		return this.handle.ready() &&
			Movies.find().count() < this.handle.loaded();
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_persons_list.events({
	'click #persons.load-more': function(e) {
		e.preventDefault();
		this.handle.loadNextPage();
	}
});
