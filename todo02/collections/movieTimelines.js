MovieTimelines = new Meteor.Collection('coll_movieTimelines');
/*------------------------------------------------------------------------------------------------------------------------------*/
// Create a collection where users can only modify documents that
// they own. Ownership is tracked by an 'userId' field on each
// document. All documents must be owned by the user (or userId='admin') that created
// them and ownership can't be changed. Only a document's owner (or userId='admin')
// is allowed to delete it, and the 'locked' attribute can be
// set on a document to prevent its accidental deletion.

MovieTimelines.allow({
	insert: function (userId, doc) {
		//return ownsDocumentOrAdmin(userId, doc);
		return false;
	},
	update: function (userId, doc, fields, modifier) {
		return ownsDocumentOrAdmin(userId, doc);
	},
	remove: function (userId, doc) {
		return ownsDocumentOrAdmin(userId, doc);
	},
	fetch: ['userId']
});

MovieTimelines.deny({
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
	createMovieTimeline: function(movieTimelineAttr) {
		var user = Meteor.user();

		// validate the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to create a Movie Timeline");

		// validate data
//		if (!movieTimelineAttr.data)
//			throw new Meteor.Error(422, 'Your Movie Timeline is empty');

		// check that there are no previous posts with the same link
		//		if (movieTimelineAttr.url && postWithSameLink) {
		//			throw new Meteor.Error(302,
		//				'This link has already been posted',
		//				postWithSameLink._id);
		//		}

		var movieTimeline = _.extend(_.pick(movieTimelineAttr, 'movieId'), {
			description: "My Movie Timeline Description",
			data: [
				{
					'start': new Date(),
					'content': 'My Event'
				}
			],
			userId: (isAdmin()) ? "admin" : user._id,
			author: user.username,
			created: new Date().getTime(),
			comment_count: 0,
			upvoters: [],
			vote_count: 0
		});

		var movieTimelineId = MovieTimelines.insert(movieTimeline);

		return movieTimelineId;
	},

	updateMovieTimelineDescription: function(_id, description, userId) {
		var user = Meteor.user();

		if (!user)
			throw new Meteor.Error(401, "You need to login to update a Movie Timeline");
		if (!isAdmin() && user._id !== userId)
			throw new Meteor.Error(401, "Your not the owner of this Movie Timeline");
		if (!description)
			throw new Meteor.Error(422, 'Your Description is empty');

		MovieTimelines.update({
			_id: _id
		}, {
			$set: {
				description: description,
				updated: new Date().getTime()
			}
		});
	},

	updateMovieTimelineData: function(_id, data, userId) {
		var user = Meteor.user();

		if (!user)
			throw new Meteor.Error(401, "You need to login to update a Movie Timeline");
		if (!isAdmin() && user._id !== userId)
			throw new Meteor.Error(401, "Your not the owner of this Movie Timeline");
		if (!data)
			throw new Meteor.Error(422, 'Your Movie Timeline data is empty');

		MovieTimelines.update({
			_id: _id
		}, {
			$set: {
				data: data,
				updated: new Date().getTime()
			}
		});
	},

	deleteMovieTimeline: function(_id, userId) {
		var user = Meteor.user();

		if (!user)
			throw new Meteor.Error(401, "You need to login to delete a Movie Timeline");
		if (!isAdmin() && user._id !== userId)
			throw new Meteor.Error(401, "Your not the owner of this Movie Timeline");

		MovieTimelines.remove({
			_id: _id
		});
	},

	upvoteMovieTimeline: function(movieId) {
		var user = Meteor.user();

		// validate the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to vote");

		MovieTimelines.update({
			_id: movieId,
			upvoters: {$ne: user._id}
		}, {
			$set: {upvoters: user._id},
			$inc: {vote_count: 1}
		});
	}
});
