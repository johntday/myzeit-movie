Template.tmplMovieTimeline2.helpers({
//	createdAgo: function() {
//		return moment(this.created).startOf('hour').fromNow();
//	},
//	toString: function() {
//		return JSON.stringify(this.data);
//	}
});

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
Template.tmpl_movie_timeline_detail.helpers({
	isAdmin: function() {
		return isAdmin();
	},
	isReadOnly: function() {
		return Meteor.MyClientModule.isReadOnly();
	},
	breadcrumbs: function() {
		return {breadcrumbs: [
			new Meteor.MyClientModule.Breadcrumb("home","/",false),
			new Meteor.MyClientModule.Breadcrumb("SciFi","/sciFiMovies",false),
			new Meteor.MyClientModule.Breadcrumb("crap","",true)
		]};
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMovieTimeline.rendered = function() {
	var timeline;
	var movieTimelineData = this.data.data;
//		[
//		{
//			'start': new Date(2010,7,23),
//			'content': 'Conversation'
//		},
//		{
//			'start': new Date(2010,7,23,23,0,0),
//			'content': 'Mail from boss'
//		},
//		{
//			'start': new Date(2010,7,24,16,0,0),
//			'content': 'Report'
//		},
//		{
//			'start': new Date(2010,7,26),
//			'end': new Date(2010,8,2),
//			'content': 'Traject A'
//		},
//		{
//			'start': new Date(2010,7,28),
//			'content': 'Memo'
//		},
//		{
//			'start': new Date(2010,7,29),
//			'content': 'Phone call'
//		},
//		{
//			'start': new Date(2010,7,31),
//			'end': new Date(2010,8,3),
//			'content': 'Traject B'
//		},
//		{
//			'start': new Date(2010,8,4,12,0,0),
//			'content': 'Report'
//		}
//	];

	drawVisualization();

	// Called when the Visualization API is loaded.
	function drawVisualization() {
//		movieTimelineData.forEach(function (movieTimeline) {
//			data = movieTimeline.data;
//		});

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
		timeline.draw(movieTimelineData, options);
	};
	Meteor.MyClientModule.scrollToTopOfPageFast();
};
/*------------------------------------------------------------------------------------------------------------------------------*/
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
