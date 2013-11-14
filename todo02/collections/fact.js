Facts = new Meteor.Collection('coll_facts');

TRUST_LOW=1;
TRUST_MED=2;
TRUST_HIGH=3;
/*------------------------------------------------------------------------------------------------------------------------------*/
// Create a collection where users can only modify documents that
// they own. Ownership is tracked by an 'userId' field on each
// document. All documents must be owned by the user (or userId='admin') that created
// them and ownership can't be changed. Only a document's owner (or userId='admin')
// is allowed to delete it, and the 'locked' attribute can be
// set on a document to prevent its accidental deletion.

Facts.allow({
	insert: function (userId, doc) {
		//return ownsDocumentOrAdmin(userId, doc);
		return true;
	},
	update: function (userId, doc, fields, modifier) {
		return ownsDocumentOrAdmin(userId, doc);
	},
	remove: function (userId, doc) {
		return ownsDocumentOrAdmin(userId, doc);
	},
	fetch: ['userId']
});

Facts.deny({
	update: function (userId, docs, fields, modifier) {
		// can't change owners
		return _.contains(fields, 'userId');
	},
	remove: function (userId, doc) {
		// can't remove locked documents
		return doc.locked;
	},
	fetch: ['locked'] // no need to fetch 'userId'
});
/*------------------------------------------------------------------------------------------------------------------------------*/

Meteor.methods({
	getCount: function(collection, query){
		var user = Meteor.user();
		var cnt = 0;

		if (!user)
			throw new Meteor.Error(601, 'You need to login to do "getCount"');
		if (! isAdmin(user) )
			throw new Meteor.Error(601, 'You need to be an Admin to do "getCount"');

		return collection.find(query).count();
	},

	createFact: function(properties){
		MyLog("collections/facts.js/createFact/1", "properties", properties);
		var user = Meteor.user(),
			userId = getDocUserIdForSaving(properties, user),
			factId = '';

		if (!user)
			throw new Meteor.Error(601, 'You need to login to create a new fact');
		if ( Facts.findOne({movieId: properties.movieId, text: properties.text}) )
			throw new Meteor.Error(601, 'Already have a fact like this');

		var fact = _.extend(properties, {
			userId: userId
			, author: getUserDisplayName(user)
			, created: getNow()
			, status: (isAdmin(user)) ? STATUS_APPROVED : STATUS_PENDING
			, trust: (isAdmin(user)) ? TRUST_HIGH : TRUST_LOW
		});

		MyLog("collections/facts.js/createFact/2", "fact", fact);

		factId = Facts.insert(fact);
		fact.factId = factId;

		// NOTIFICATION
//		if (! isAdmin(user)) {
//			var n = notificationFactory(FACT_CREATED_BY_USER, "fact", "admin", trimWords(fact.text,3), fact.status, "/sciFiMovies/facts/"+factId, fact.created);
//			Notifications.insert(n);
//		}

		return fact;
	},

	updateFactStatus: function(_id, status, movieId){
		var user = Meteor.user();

		if (!user)
			throw new Meteor.Error(601, 'You need to login to update a fact');
		if(!status /* TODO or check is integer*/)
			throw new Meteor.Error(602, 'Invalid status: "' + status + '"');

		Facts.update(
			_id,
			{$set: {status: status, updated: getNow()}}
		);

		// NOTIFICATION
		if (isAdmin(user)) {
			var m = Facts.findOne(_id);
			var n = notificationFactory(FACT_UPDATED_BY_ADMIN, "fact", m.userId, trimWords(m.text,2), fact.status, "/sciFiMovies/facts/"+movieId, fact.created);
			Notifications.insert(n);
		}
		return fact;
	},

	clickedFact: function(_id){
		updateClickCnt(Facts, this.params._id);
	},

	deleteFact: function(_id, movieId) {
		var user = Meteor.user();
		if (!user)
			throw new Meteor.Error(601, 'You need to login to delete a fact');
		var m = Facts.findOne(_id);

		// NOTIFICATION
//		if (isAdmin(user) && m && m.userId !== user._id) {
//			var n = notificationFactory(MOVIE_DELETED_BY_ADMIN, "fact", m.userId, trimWords(m.text,2), m.status, "/sciFiMovies/facts/"+movieId, getNow());
//			Notifications.insert(n);
//		}

		Facts.remove(_id);
		return _id;
	},

	addFactFavUser: function(_id, userId){
		Facts.update(_id,
			{ $addToSet: { favs: userId }, $inc: { favs_cnt: 1 } }
		);
	},

	deleteFactFavUser: function(_id, userId){
		Facts.update(_id,
			{ $pull: { favs: userId }, $inc: { favs_cnt: -1 } }
		);
	}

});
