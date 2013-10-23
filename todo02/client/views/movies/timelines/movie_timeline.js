/**
 * LIST
 */
Template.tmplMovieTimelineList.helpers({
	breadcrumbs: function() {
		return Session.get("breadcrumbs");
	},
	movieId: function() {
		return Session.get("selected_movie_id");
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMovieTimelineList.events({
	'click #create-movie-timeline': function(e, template) {
		e.preventDefault();

		var movieTimelineAttr = {
			movieId: Session.get('selected_movie_id')
		};

		var movieTimelineId = Meteor.call('createMovieTimeline', movieTimelineAttr, function(error, movieTimelineId) {
			if (error)
				throwError(error.reason);
		});
		Meteor.subscribe('pubsub_user_movie_timeline_list', Session.get('selected_movie_id'), Meteor.userId());
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMovieTimelineList.rendered = function() {
	var isDebug = false;
	var timeline;
	var movieTimelines = this.data;
	var isAdminTimeline = false;
	var isMyTimeline = false;
	var common_options = {
		width: "100%",
		height: "300px",
		axisOnTop: false,
		showNavigation: true,
		animate: true,
		animateZoom: true,
		layout: "box"
	};
	var myMovieTimeline = {};

	movieTimelines.forEach(function (movieTimeline) {
		if (movieTimeline.userId === "admin" && !isAdmin()) {
			isAdminTimeline = true;
			var options = _.extend(common_options,
				{
					editable: isAdmin(),
					enableKeys: isAdmin(),
					showButtonNew: isAdmin()
				}
			);
			drawVisualization("#admintimeline", movieTimeline.data, options);
		} else if (movieTimeline.userId === Meteor.userId() || isAdmin()) {
			myMovieTimeline = movieTimeline;
			isMyTimeline = true;
			var options = _.extend(common_options,
				{
					editable: true,
					enableKeys: true,
					showButtonNew: true
				}
			);
			drawVisualization("#mytimeline", movieTimeline.data, options);
		}
	});

	/**
	 * INIT
	 */
	$("#mytimeline-description")[0].innerHTML = (myMovieTimeline.description) ? myMovieTimeline.description : "";
	$( "#mytimeline-description-edit" ).hide();
	(myMovieTimeline._id) ? $( "#delete" ).show() : $( "#delete" ).hide();
	$( "#update-data" ).hide();
	$("#form").hide();
	$("#update-movie-event").hide();
	if (isAdmin()) {
		$("#mytimeline-title").hide();
	} else {
		if (!isAdminTimeline)
			$("#admintimeline-title").hide();
		if (isMyTimeline)
			$("#create-movie-timeline").hide();
	}

	/**
	 * EVENTS
	 */
	$( "#form-content" ).keyup(function(e) {
		var row = getSelectedRow();
		if ( $("#form").is(':visible') && $( this ).val() !== timeline.getData()[row].content ) {
			var $button = $("#update-movie-event");
			$button.show();
			if (e.which == 13)
				$button.click();
		} else
			$("#update-movie-event").hide();
	});
	$( "#update-data" ).click(function() {
		Meteor.call('updateMovieTimelineData', myMovieTimeline._id, timeline.getData(), myMovieTimeline.userId, function(error) {
			if (error)
				throwError(error.reason);
			else
				$(this).hide();
		});
		Meteor.subscribe('pubsub_user_movie_timeline_list', Session.get('selected_movie_id'), Meteor.userId());
	});
	$( "#delete" ).click(function() {
		Meteor.call('deleteMovieTimeline', myMovieTimeline._id, myMovieTimeline.userId, function(error) {
			if (error)
				throwError(error.reason);
			else
				$(this).hide();
		});
		Meteor.subscribe('pubsub_user_movie_timeline_list', Session.get('selected_movie_id'), Meteor.userId());
	});
	$( "#update-movie-event" ).click(function() {
		var row = getSelectedRow();
		if ( $("#form").is(':visible') && $( "#form-content" ).val() !== timeline.getData()[row].content ) {
			timeline.getData()[row].content = $( "#form-content" ).val();
			timeline.redraw();
			$(this).hide();
			$("#form").hide();
		}
		$( "#update-data" ).show();
	});
	$( "#mytimeline-description" ).click(function() {
		var $input = $( "#mytimeline-description-edit");
		$(this).hide();
		$input.val( myMovieTimeline.description )
		$input.show();
		$input.focus();
	});
	$( "#mytimeline-description-edit" ).focusout(function() {
		myMovieTimeline.description = $(this).val();
		$("#mytimeline-description")[0].innerHTML = myMovieTimeline.description;
		$( "#mytimeline-description").show();
		$(this).hide();

		Meteor.call('updateMovieTimelineDescription', myMovieTimeline._id, myMovieTimeline.description, myMovieTimeline.userId, function(error) {
			if (error)
				throwError(error.reason);
		});
		Meteor.subscribe('pubsub_user_movie_timeline_list', Session.get('selected_movie_id'), Meteor.userId());
	});
	$( "#mytimeline-description-edit" ).keyup(function(e) {
		if (e.which == 13) {
			$( "#mytimeline-description-edit" ).focusout();
		}
	});

	Meteor.MyTimelineModule.links.events.addListener(timeline, 'select', onselect);
	Meteor.MyTimelineModule.links.events.addListener(timeline, 'delete', ondelete);
	Meteor.MyTimelineModule.links.events.addListener(timeline, 'add', onadd);
	Meteor.MyTimelineModule.links.events.addListener(timeline, 'change', onchange);

	/**
	 * FUNCTIONS
	 */
	// Called when the Visualization API is loaded.
	function drawVisualization(divname, data, options) {

		timeline = new Meteor.MyTimelineModule.links.Timeline( $(divname)[0] );

		// Draw our timeline with the created data and options
		timeline.draw(data, options);
	};
	function getSelectedRow() {
		var row = undefined;
		var sel = timeline.getSelection();
		if (sel.length) {
			if (sel[0].row != undefined) {
				row = sel[0].row;
			}
		}
		return row;
	};
	function onselect(event) {
		var row = getSelectedRow();
		if (typeof row !== 'undefined') {
			//$("#update-movie-event").show();
			var isTimeline = timeline.getData()[row].hasOwnProperty("end");
			var $input = $("#form-content");
			$("#form-title")[0].innerHTML = isTimeline ? "Edit Timeline" : "Edit Event";
			$input.val( timeline.getData()[row].content );
			$("#form").show();
			$input.focus();
		} else {
			$("#form").hide();
		}
	};
	function onadd(event) {
		$( "#update-data" ).show();

		onselect(event);
	};
	function onchange(event) {
		$( "#update-data" ).show();
	};
	function ondelete(event) {
		$( "#update-data" ).show();
		var row = getSelectedRow();
		if (typeof row !== 'undefined') {
			$( "#update-movie-event").hide();
			$("#form").hide();
		}
	};

	//Meteor.MyClientModule.scrollToTopOfPageFast();
};

/**
 * LIST ITEM
 */
Template.tmplMovieTimelineItem.helpers({
	movieLink: function() {
		return "/sciFiMovies/" + this._id;
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMovieTimelineItem.rendered = function(){
	// animate post from previous position to new position
	var instance = this;
	var rank = instance.data._rank;
	var $this = $(this.firstNode);
	var postHeight = 80;
	var newPosition = rank * postHeight;

	// if element has a currentPosition (i.e. it's not the first ever render)
	if (typeof(instance.currentPosition) !== 'undefined') {
		var previousPosition = instance.currentPosition;
		// calculate difference between old position and new position and send element there
		var delta = previousPosition - newPosition;
		$this.css("top", delta + "px");
	} else {
		// it's the first ever render, so hide element
		$this.addClass("invisible");
	}

	// let it draw in the old position, then..
	Meteor.defer(function() {
		instance.currentPosition = newPosition;
		// bring element back to its new original position
		$this.css("top",  "0px").removeClass("invisible");
	});
};

/**
 * DETAIL
 */
Template.tmplMovieTimeline.helpers({
	hasMineAndAdminTimeline: function() {
		return true;
	},
	hasMineTimeline: function() {
		return true;
	},
	hasAdminTimeline: function() {
		return true;
	},
	hasNoTimeline: function() {
		return true;
	}
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
	//Meteor.MyClientModule.scrollToTopOfPageFast();
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMovieTimeline.events({
	'click #create-movie-timeline': function(e, template) {
		e.preventDefault();

		var movieTimelineAttr = {
			movieId: Session.get('selected_movie_id')
		};

		var movieTimelineId = Meteor.call('createMovieTimeline', movieTimelineAttr, function(error, movieTimelineId) {
			if (error){
				throwError(error.reason);
			} else {
				//$body.val('');
			}
		});
	}
});
