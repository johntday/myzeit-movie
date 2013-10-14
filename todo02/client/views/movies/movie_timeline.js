
/* ------------------------------------------------------------------------------------------------------------- */
Template.tmplMovieTimeline.helpers({
	isMovieTimeline: function() {
		return isMovieTimeline();
	}
//	movieTimeline: function() {
//		var m;
//		getMovieTimelines().forEach(function (movieTimeline) {
//			m = movieTimeline;
//		});
//		return m;
//	}
});

Template.tmplMovieTimeline.rendered = function() {
	var timeline;
	var movieTimelineData = this.handle;
	var data;

	drawVisualization();

	// Called when the Visualization API is loaded.
	function drawVisualization() {
		movieTimelineData.forEach(function (movieTimeline) {
			data = movieTimeline.data;
		});

		var options = {
			width: "100%",
			height: "300px",
			editable: true,   // enable dragging and editing events
			enableKeys: true,
			axisOnTop: false,
			showNavigation: true,
			showButtonNew: true,
			animate: true,
			animateZoom: true,
			layout: "box"
		};

		timeline = new Meteor.MyTimelineModule.links.Timeline( $('#mytimeline')[0] );

//		function onRangeChanged(properties) {
//			$('#info')[0].innerHTML += 'rangechanged ' +
//				properties.start + ' - ' + properties.end + '<br>';
//		}
		//Meteor.MyTimelineModule.links.events.addListener(timeline, 'rangechanged', onRangeChanged);

		// Draw our timeline with the created data and options
		timeline.draw(data, options);

		movieTimelines = null;
	};

};

Template.tmplMovieTimeline.events({
	'click #create-movie-diagram': function(e, template) {
		e.preventDefault();

		var movieTimelineAttr = {
			movieId: Session.get('selected_movie_id')
		};

		Meteor.call('createMovieTimeline', movieTimelineAttr, function(error, movieTimelineId) {
			if (error){
				throwError(error.reason);
			} else {
				//$body.val('');
			}
		});
	}
});
