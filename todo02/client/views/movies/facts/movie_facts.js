Template.tmplMovieFactsList.helpers({
	breadcrumbs: function() {
		Meteor.MyClientModule.scrollToTopOfPageFast();
		return Session.get("breadcrumbs");
	},
	title: function() {
		return Session.get('breadcrumbs').breadcrumbs[2].title;
	},
	movieId: function() {
		return Session.get("selected_movie_id");
	},
	movieFactsHandle: function() {
		return movieFactsHandle;
	}
});

Template.tmpl_facts_list.helpers({
	facts: function() {
		return this.fetch();
	},
	ready: function() {
		return this.ready();
	},
	loaded: function() {
		//		allPostsLoaded = this.fetch().length < this.loaded();
		//		Session.set('allPostsLoaded', allPostsLoaded);
		//		return allPostsLoaded;
		return ( this.fetch().length < this.loaded() );
	},
	isEmpty: function() {
		return (this.fetch().length === 0);
	}
});