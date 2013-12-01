Template.tmplMovieDetail.helpers({
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
	canEditAndEditToggleAdmin: function() {
		return isAdmin() && Session.get('form_update');
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
	},
	isFav: function() {
		return isFav(this.favs);
	},
	hasSeen: function() {
		return hasSeen(this.seen);
	},
	isStar: function() {
		return isStar(this.stars);
	},
	smallPoster: function() {
		return (this.posters && this.posters.detailed) ? this.posters.detailed : "/img/notfound.png";
	},
	critics_score: function() {
		if (!this.ratings || !this.ratings.critics_score || this.ratings.critics_score === -1) return 'NA';
		return this.ratings.critics_score+'%';
	},
	click_cnt: function() {
		return (this.click_cnt) ? this.click_cnt : 0;
	},
	favs_cnt: function() {
		return (this.favs_cnt && this.favs_cnt > -1) ? this.favs_cnt : 0;
	},
	seen_cnt: function() {
		return (this.seen_cnt && this.seen_cnt > -1) ? this.seen_cnt : 0;
	},
	stars_cnt: function() {
		return (this.stars_cnt && this.stars_cnt > -1) ? this.stars_cnt : 0;
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMovieDetail.events({
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

	'click #icon-heart': function(e) {
		var user = Meteor.user();
		if(!user){
			throwError('You must login to add a movie to your favorities');
			return false;
		}

		if ( isFav(this.favs) ) {
			Movies.update(this._id,
				{
					$pull: { favs: user._id },
					$inc: { favs_cnt: -1 }
				}
			);
			MyLog("movie_details.js/click #icon-heart/1", "remove from favs");
		} else {
			Movies.update(this._id,
				{
					$addToSet: { favs: user._id },
					$inc: { favs_cnt: 1 }
				}
			);
			MyLog("movie_details.js/click #icon-heart/1", "add to favs");
		}
	},

	'click #icon-eye': function(e) {
		var user = Meteor.user();
		if(!user){
			throwError('You must login to add a movie to your "seen it" list');
			return false;
		}

		if ( hasSeen(this.seen) ) {
			Movies.update(this._id, { $pull: { seen: user._id }, $inc: { seen_cnt: -1 } } );
			MyLog("movie_details.js/click #icon-eye/2", "remove from seen");
		} else {
			Movies.update(this._id, { $addToSet: { seen: user._id }, $inc: { seen_cnt: 1 } } );
			MyLog("movie_details.js/click #icon-eye/1", "remove from seen");
		}
	},

	'click #icon-star': function(e) {
		var user = Meteor.user();
		if(!user){
			throwError('You must login to add a movie to your "star" list');
			return false;
		}

		if ( isStar(this.stars) ) {
			Movies.update(this._id, { $pull: { stars: user._id }, $inc: { stars_cnt: -1 } } );
			MyLog("movie_details.js/click #icon-star/2", "remove from stars");
		} else {
			Movies.update(this._id, { $addToSet: { stars: user._id }, $inc: { stars_cnt: 1 } } );
			MyLog("movie_details.js/click #icon-star/1", "remove from stars");
		}
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
		var status = $('#status').val();

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

		if ( isAdmin(Meteor.user()) ) {
			_.extend(properties, {
				status: status
			});
		}

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
				Session.set('form_update', false);
				MyLog("movie_details.js/1", "updated movie", {'_id': _id, 'title': movie.title});
				Router.go('/sciFiMovies/'+_id);
			}
		});
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmplMovieDetail.rendered = function() {
	$("#title").focus();

	$('#div-release_date .input-append.date').datepicker({
		autoclose: true,
		todayHighlight: true
	});

//	$("#seen-it").change(function() {
//		var hasSeenIt = $("input[name='seen-it']:checked").attr('id');
//		if (hasSeenIt) {
//			if (hasSeenIt === 'true')
//				Movies.update(_id, { $addToSet: { seen: userId }, $inc: { seen_cnt: 1 } } );
//			else if (hasSeenIt === 'false')
//				Movies.update(_id, { $pull: { seen: userId }, $inc: { seen_cnt: -1 } } );
//		}
//	});
//
//	$("#want-to-see-it").change(function() {
//		var hasWantToSeeIt = $("input[name='want-to-see-it']:checked").attr('id');
//	});

	if ( Session.get('form_update') ) {
		$("#btnEditToggle").addClass("active");
	} else {
		$("#btnEditToggle").removeClass("active");
	}
};