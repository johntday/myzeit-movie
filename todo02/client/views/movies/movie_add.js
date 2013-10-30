Template.tmpl_movie_add.helpers({
	isAdmin: function() {
		return isAdmin();
	},
	canCreateMovie: function() {
		return canCreateMovie(Meteor.user());
	},
	options: function() {
		return getMpaaOptions();
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_movie_add.events({
	'click #btnCreateMovie': function(e) {
		e.preventDefault();
		$(e.target).addClass('disabled');
		var isInputError = false;
		var NCHARS = 3;

		if(!Meteor.user()){
			throwError('You must login to create a movie');
			$(e.target).removeClass('disabled');
			return false;
		}

		var title= $('#title').val();
		var year = parseInt( $('#year').val() );
		var release_date = $('#release_date').val();
		var original_title= $('#original_title').val();
		var mpaa_rating= $('#mpaa_rating').val();
		var runtime= $('#runtime').val();
		var tagline= $('#tagline').val();
		var overview= $('#overview').val();
		var critics_consensus= $('#critics_consensus').val();
		var adult = $('#adult').prop('checked');

		if (! title) {
			isInputError = true;
			throwError("Please add a title");
		} else if (title.trim().length < NCHARS) {
			isInputError = true;
			throwError("Please add a title more than " + (NCHARS-1) + " characters");
		}
		if (year && !isValidMovieYear(year) ) {
			isInputError = true;
			throwError("Please enter a valid year (e.g. 1978)");
		}
		if (isInputError) {
			$(e.target).removeClass('disabled');
			return false;
		}

//		var sticky=!!$('#sticky').attr('checked');
//		var submitted = $('#submitted_hidden').val();
//		var status = parseInt($('input[name=status]:checked').val());

		var properties = {
			title: title
			, year: setDefault(year, -1)
			, release_date: release_date
			, original_title: original_title
			, mpaa_rating: mpaa_rating
			, runtime: setDefault(runtime, -1)
			, tagline: tagline
			, overview: overview
			, critics_consensus: critics_consensus
			, adult: adult
		};

//		console.log("before call to server: "+JSON.stringify(properties));

		Meteor.call('createMovie', properties, function(error, movie) {
			if(error){
				console.log(JSON.stringify(error));
				throwError(error.reason);
//				clearSeenErrors();
				$(e.target).removeClass('disabled');
//				if(error.error == 603)
//					Meteor.Router.to('/posts/'+error.details);
			}else{
				trackEvent("create movie", {'_id': movie.movieId});
//				if(post.status === STATUS_PENDING)
//					throwError('Thanks, your post is awaiting approval.')
				Router.go('/sciFiMovies/'+movie.movieId);
			}
		});


	}
});
