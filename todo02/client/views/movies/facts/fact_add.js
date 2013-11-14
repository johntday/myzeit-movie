Template.tmpl_fact_add.helpers({
	isAdmin: function() {
		return isAdmin();
	},
	canCreateFact: function() {
		return canCreateFact(Meteor.user());
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_fact_add.events({
	'click #btnCreateFact': function(e) {
		e.preventDefault();
		$(e.target).addClass('disabled');

		if(!Meteor.user()){
			throwError('You must login to create a fact');
			$(e.target).removeClass('disabled');
			return false;
		}

		// GET INPUT
		var text= $('#text').val();

		var properties = {
			movieId: Session.get('selected_movie_id')
			, text: text
		};

		// VALIDATE
		if ( validateFact(properties) ) {
			$(e.target).removeClass('disabled');
			return false;
		}

		// TRANSFORM AND DEFAULTS
		transformFact(properties);

		Meteor.call('createFact', properties, function(error, fact) {
			if(error){
				console.log(JSON.stringify(error));
				throwError(error.reason);
				$(e.target).removeClass('disabled');
			}else{
				$(e.target).removeClass('disabled');
				Session.set('form_update', false);
				$('#text').val('');
			}
		});
	},
	'keyup #text': function(e) {
		e.preventDefault();
		if (e.which === 13/*ENTER*/)
			$('#btnCreateFact').click();
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_fact_add.rendered = function() {
	$("#text").focus();
};
