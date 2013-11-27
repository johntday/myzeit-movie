Template.tmplHome.events({
	// BUTTON TO SHOW EXAMPLE TIMELINE
	'click #btn-timeline-example': function(e, template) {
		e.preventDefault();
		Router.go('/sciFiMovies/timelines/example/2001_a_space_odyssey');
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
