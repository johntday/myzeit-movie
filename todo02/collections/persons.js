Persons = new Meteor.Collection('coll_persons');
/*------------------------------------------------------------------------------------------------------------------------------*/
//STATUS_PENDING=1;
//STATUS_APPROVED=2;
//STATUS_REJECTED=3;
/*------------------------------------------------------------------------------------------------------------------------------*/
Persons.allow({
	insert: canEditById
	, update: canEditById
	, remove: canEditById
});

Persons.deny({
	update: function(userId, doc, fieldNames) {
		if(isAdminById(userId))
			return false;
		// may only edit the following fields:
		return (_.without(fieldNames, 'fieldname1').length > 0);
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Meteor.methods({
	createPerson: function(properties){
		MyLog("collections/persons.js/createPerson/1", "properties", properties);
		var user = Meteor.user(),
			userId = getDocUserIdForSaving(properties, user),
			personId = '';

		if (!user)
			throw new Meteor.Error(601, 'You need to login to create a new person');
		if(!properties.name)
			throw new Meteor.Error(602, 'Please add a valid name');
		var personWithSameName = Persons.findOne( {name: {$regex: properties.name, $options: 'i'}} );

		if (personWithSameName) {
			//Meteor.call('upvotePost', postWithSameLink._id);
			throw new Meteor.Error(603, 'Already have a person with name "' + properties.name + '"');
		}

		var person = _.extend(properties, {
			userId: userId,
			author: getUserDisplayName(user),
			created: getNow(),
			votes: 0,
			comments: 0,
			baseScore: 0,
			score: 0,
			status: (isAdmin(user)) ? STATUS_APPROVED : STATUS_PENDING
		});

		MyLog("collections/persons.js/createPerson/2", "person", person);

		personId = Persons.insert(person);
		person.personId = personId;

		/**
		 * NOTIFICATION
		 */
		if (! isAdmin(user)) {
			Notifications.insert({
				event:'PERSON_ADD', userId: "admin", created: getNow(), personId: personId
			});
		}

		return person;
	},
	updatePerson: function(_id, properties){
		//TO-DO: make post_edit server-side?
	},
	clickedPerson: function(post){
		Persons.update(post._id, { $inc: { clicks: 1 }});
	},
	deletePerson: function(_id) {
		Persons.remove(_id);
	}
});
