Template.tmpl_movie_add.helpers({
	isAdmin: function() {
		return isAdmin();
	},
	canCreateMovie: function() {
		return canCreateMovie(Meteor.user());
	},
	options: function() {
		return getMpaaOptions();
	},
	formattedReleaseDate: function() {
		return formatReleaseDateForDisplay(this.release_date);
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_movie_add.events({
	'click #btnCreateMovie': function(e) {
		e.preventDefault();
		$(e.target).addClass('disabled');

		if(!Meteor.user()){
			throwError('You must login to create a movie');
			$(e.target).removeClass('disabled');
			return false;
		}

		// GET INPUT
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

//		var sticky=!!$('#sticky').attr('checked');
//		var submitted = $('#submitted_hidden').val();
//		var status = parseInt($('input[name=status]:checked').val());

		Meteor.call('createMovie', properties, function(error, movie) {
			if(error){
				console.log(JSON.stringify(error));
				throwError(error.reason);
//				clearSeenErrors();
				$(e.target).removeClass('disabled');
//				if(error.error == 603)
//					Meteor.Router.to('/posts/'+error.details);
			}else{
				Session.set('form_update', false);
				trackEvent("create movie", {'_id': movie.movieId});
//				if(post.status === STATUS_PENDING)
//					throwError('Thanks, your post is awaiting approval.')
				Router.go('/sciFiMovies/'+movie.movieId);
			}
		});


	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_movie_add.rendered = function() {
	$("#title").focus();

	$('#div-release_date .input-append.date').datepicker({
		autoclose: true,
		todayHighlight: true
	});

};