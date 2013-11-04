Template.tmpl_person_detail.helpers({
	isAdmin: function() {
		return isAdmin();
	},
	breadcrumbs: function() {
		Meteor.MyClientModule.scrollToTopOfPageFast();
		return Session.get("breadcrumbs");
	},
	canEdit: function() {
		return canEdit(Meteor.user(), this);
	},
	canEditAndEditToggle: function() {
		return canEdit(Meteor.user(), this) && Session.get('form_update');
	},
	createdAgo: function() {
		return moment(this.created).fromNow();
	},
	updatedAgo: function() {
		return (this.updated) ? moment(this.updated).fromNow() : this.updated;
	},
	options: function() {
		return getMpaaOptions();
	},
	statusOptions: function() {
		return getMovieStatusOptions();
	},
	formattedReleaseDate: function() {
		return formatReleaseDateForDisplay(this.release_date);
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_person_detail.events({
	'click #btnDeleteMovie': function(e) {
		e.preventDefault();
		$(e.target).addClass('disabled');

		if(!Meteor.user()){
			throwError('You must login to delete a movie');
			$(e.target).removeClass('disabled');
			return false;
		}

		Meteor.call('deleteMovie', this._id, function(error) {
			if(error){
				throwError(error.reason);
				$(e.target).removeClass('disabled');
			}else{
				trackEvent("delete movie", {'_id': this._id});
				Router.go('/sciFiMovies');
			}
		});
	},

	'click #btnEditToggle': function(e) {
		e.preventDefault();

		Session.set('form_update', !Session.get('form_update'));
	},

	'click #btnUpdateMovie': function(e) {
		e.preventDefault();
		$(e.target).addClass('disabled');

		if(!Meteor.user()){
			throwError('You must login to update a movie');
			$(e.target).removeClass('disabled');
			return false;
		}

		// GET INPUT
		var _id = this._id;
		var title= $('#title').val();
		var year = $('#year').val();
		var release_date = formatReleaseDateForSave( $('#release_date').val() );
		var original_title= $('#original_title').val();
		var mpaa_rating= $('#mpaa_rating').val();
		var runtime= $('#runtime').val();
		var tagline= $('#tagline').val();
		var overview= $('#overview').val();
		var critics_consensus= $('#critics_consensus').val();
		var adult = $('#adult').prop('checked');

		var properties = {
			title: title
			, year: year
			, release_date: release_date
			, original_title: original_title
			, mpaa_rating: mpaa_rating
			, runtime: runtime
			, tagline: tagline
			, overview: overview
			, critics_consensus: critics_consensus
			, adult: adult
		};

		// VALIDATE
		var isInputError = validateMovie(properties);
		if (isInputError) {
			$(e.target).removeClass('disabled');
			return false;
		}

		// TRANSFORM AND DEFAULTS
		transformMovie(properties);

		Meteor.call('updateMovie', _id, properties, function(error, movie) {
			if(error){
				console.log(JSON.stringify(error));
				throwError(error.reason);
				$(e.target).removeClass('disabled');
			}else{
				MyLog("movie_details.js/1", "updated movie", {'_id': _id, 'title': movie.title});
				Router.go('/sciFiMovies/'+_id);
			}
		});
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_person_detail.rendered = function() {
	$("#title").focus();

	$('#div-release_date .input-append.date').datepicker({
		autoclose: true,
		todayHighlight: true
	});

	if ( Session.get('form_update') ) {
		$("#btnEditToggle").addClass("active");
	} else {
		$("#btnEditToggle").removeClass("active");
	}
};