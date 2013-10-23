Template.tmpl_sorted_panel_list.helpers({
    options: function() {
        return {
	        reactive: false,
	        selector: {},
            sort: {release_date: 1},
            handle: moviesSortUpdatedHandle
        }
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_panel_list.helpers({
    movies: function() {
	    var i = 0;
        var options = {sort: this.sort, limit: 5};

	    return Movies.find(this.selector, options).map(function(movie) {
		    movie._rank = i;
		    i += 1;
		    return movie;
	    });
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
//Template.tmpl_panel_list.events({
//	'click #a-see-all': function(e) {
//		moviesSortUpdatedHandle.reset(5);
//	}
//});
