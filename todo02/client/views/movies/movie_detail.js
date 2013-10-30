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
	createdAgo: function() {
		return moment(this.created).fromNow();
	},
	options: function() {
		return getMpaaOptions();
	},
	statusOptions: function() {
		return getMovieStatusOptions();
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

		Meteor.call('deleteMovie', this._id, function(error, movieId) {
			if(error){
				throwError(error.reason);
				$(e.target).removeClass('disabled');
			}else{
				trackEvent("delete movie", {'_id': movieId});
				Router.go('/sciFiMovies');
			}
		});


	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
//Template.tmplMovieDetail.rendered = function() {
//	$('#critics_consensus').css('overflow', 'hidden').autogrow();
//};