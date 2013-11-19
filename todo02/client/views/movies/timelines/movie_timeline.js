/**
 * LIST
 */
Template.tmplMovieTimelineList.helpers({
	breadcrumbs: function() {
		return Session.get("breadcrumbs");
	},
	movieId: function() {
		return Session.get("selected_movie_id");
	},
	canEdit: function() {
		return canEdit(Meteor.user(), this);
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
		//Meteor.subscribe('pubsub_user_movie_timeline_list', Session.get('selected_movie_id'), Meteor.userId());
		Router.go('/sciFiMovies/timelines/' + Session.get('selected_movie_id'));
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMovieTimelineList.rendered = function() {
	var iconId = "";
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
					editable: isAdmin() || Session.get("is_example_timeline"),
					enableKeys: isAdmin() || Session.get("is_example_timeline"),
					showButtonNew: isAdmin() || Session.get("is_example_timeline")
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
		if (isMyTimeline || Session.get("is_example_timeline"))
			$("#create-movie-timeline").hide();
		else {
			$("#mytimeline-title").hide();
			$("#btn-help").hide();
		}
	}
	if (Session.get("is_example_timeline"))
		$("#mytimeline-title").hide();

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
		if (Session.get("is_example_timeline"))
			$(this).hide();
		else {
			MyLog("movie_timeline.js/updateTimelineData/1", "doing data update");

			MovieTimelines.update({
				_id: myMovieTimeline._id
			}, {
				$set: {
					data: timeline.getData()
				}
			});

			$(this).hide();
		}
	});
	$( "#delete" ).click(function() {
		MyLog("movie_timeline.js/$('#delete').click(function()/1", "doing timeline delete");

		MovieTimelines.remove({_id: myMovieTimeline._id});

		$(this).hide();
		Router.go('/sciFiMovies/timelines/' + Session.get('selected_movie_id'));
	});
	$("#dropdown-icon > li").click(function(e) {
		var iconId = $(this).data("iconName");

//		if (isDirty) {
			var row = getSelectedRow();
			timeline.getData()[row].content = getIconText(iconId) + " " + getEventText();
			timeline.redraw();
			$(this).hide();
//			$("#form").hide();
//		}
		$( "#update-data" ).show();
	});
	$( "#update-movie-event" ).click(function() {
		var row = getSelectedRow();
		if ( $("#form").is(':visible') && getEventText() !== timeline.getData()[row].content ) {
			timeline.getData()[row].content = getEventText();
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

		MovieTimelines.update(
			{_id: myMovieTimeline._id}, {
			$set: {
				description: myMovieTimeline.description
			}
		});
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
			$input.val( getEventText( timeline.getData()[row].content ) );
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
	function getEventText(s) {
		var text = (s) ? s : $( "#form-content" ).val();
		var index = text.indexOf("</span>");
		if (index === -1) {
			return text;
		}
		return text.substring(index+8);
	};
	function getIconText(iconId) {
		return (iconId) ? "<span class='glyphicon glyphicon-"+iconId+"'></span>" : "";
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
	click_cnt: function() {
		return (this.click_cnt) ? this.click_cnt : 0;
	},
	favs_cnt: function() {
		return (this.favs_cnt && this.favs_cnt > -1) ? this.favs_cnt : 0;
	},
	canEdit: function() {
		return canEdit(Meteor.user(), this);
	},
	canEditAndEditToggleAdmin: function() {
		return isAdmin(Meteor.user()) && Session.get('form_update');
	},
	isFav: function() {
		return isFav(this.favs);
	},
	breadcrumbs: function() {
		Meteor.MyClientModule.scrollToTopOfPageFast();
		return {breadcrumbs: [
			{title:"home", link:"/", isActive:false},
			{title:"SciFi", link:"/sciFiMovies", isActive:false},
			{title:this.title, link:"/sciFiMovies/"+this.movieId, isActive:false},
			{title:"timeline", link:"", isActive:true}
		]};
	},
	createdAgo: function() {
		return moment(this.created).fromNow();
	},
	updatedAgo: function() {
		return (this.updated) ? moment(this.updated).fromNow() : this.updated;
	}
});
Template.tmplMovieTimeline.events({
	'click #icon-heart': function(e) {
		var user = Meteor.user();
		if(!user){
			throwError('You must login to add a timeline to your favorities');
			return false;
		}

		if ( isFav(this.favs) ) {
			MovieTimelines.update(this._id,
				{
					$pull: { favs: user._id },
					$inc: { favs_cnt: -1 }
				}
			);
			MyLog("movie_timeline.js/click #icon-heart/1", "remove from favs");
		} else {
			MovieTimelines.update(this._id,
				{
					$addToSet: { favs: user._id },
					$inc: { favs_cnt: 1 }
				}
			);
			MyLog("movie_timeline.js/click #icon-heart/1", "add to favs");
		}
	},
	'click #btnEditMovie': function(e) {
		Router.go('/sciFiMovies/timelines/'+this.movieId);
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMovieTimeline.rendered = function() {
	var timeline;
	var movieTimelineData = this.data.data;

	drawVisualization();

	// Called when the Visualization API is loaded.
	function drawVisualization() {
		var options = {
			width: "100%",
			height: "300px",
			axisOnTop: false,
			showNavigation: true,
			animate: true,
			animateZoom: true,
			layout: "box",
			editable: false, enableKeys: false, showButtonNew: false
		};

		timeline = new Meteor.MyTimelineModule.links.Timeline( $('#mytimeline')[0] );

		// Draw our timeline with the created data and options
		timeline.draw(movieTimelineData, options);
	};
};
/*------------------------------------------------------------------------------------------------------------------------------*/
