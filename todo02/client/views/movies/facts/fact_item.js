Template.tmpl_movie_fact_item.helpers({
	createdAgo: function() {
		return moment(this.created).fromNow();
	},
	canEdit: function() {
		return canEdit(Meteor.user(), this);
	},
	statusDisplay: function() {
		var s = _.find( getMovieStatusOptions(),
			function(obj){
				return (obj.id === this.status);
			}
		);
		return (s) ? s.label : '';
	},
	statusOptions: function() {
		return getMovieStatusOptions();
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_movie_fact_item.rendered = function() {
	$('#fact-item > div > p > button').click(function(e) {
		e.preventDefault();

		var factId = $(this).data("factId");
		var movieId = Session.get('selected_movie_id');

		if(!Meteor.user()){
			throwError('You must login to delete a fact');
			return false;
		}

//		Facts.remove(factId);
		Meteor.call('deleteFact', factId, movieId, function(error, result) {
			if(error){
				console.log(JSON.stringify(error));
				throwError(error.reason);
			}else{
				Session.set('form_update', false);
			}
		});
	});
}