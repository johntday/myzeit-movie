Persons = new Meteor.Collection('coll_persons');
/*------------------------------------------------------------------------------------------------------------------------------*/
Movies.allow({
	insert: isAdmin,
	update: isAdmin,
	remove: isAdmin
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Meteor.methods({
	createPerson: function(attrs) {
		var user = Meteor.user();

		// validate the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to create a new Person");

		// validate data
		//		if (!movieTimelineAttr.data)
		//			throw new Meteor.Error(422, 'Your Movie Timeline is empty');

		// check that there are no previous posts with the same link
		//		if (movieTimelineAttr.url && postWithSameLink) {
		//			throw new Meteor.Error(302,
		//				'This link has already been posted',
		//				postWithSameLink._id);
		//		}

		var person = _.extend(attrs, {
			userId: user._id,
			author: user.username,
			created: new Date().getTime(),
			comment_count: 0,
			vote_count: 0,
			vote_average: 0
		});

		return MovieTimelines.insert(person);
	}
});
