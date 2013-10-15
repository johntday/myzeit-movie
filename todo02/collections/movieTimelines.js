MovieTimelines = new Meteor.Collection('movieTimelines');
/*------------------------------------------------------------------------------------------------------------------------------*/
MovieTimelines.allow({
	insert: isAdmin,
	update: isAdmin,
	remove: isAdmin
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
			description: "My Movie Timeline",
			data: [
				{
					'start': new Date(),
					'content': 'My Event'
				}
			],
			userId: user._id,
			author: user.username,
			created: new Date().getTime(),
			comment_count: 0,
			upvoters: [],
			vote_count: 0
		});

		var movieTimelineId = MovieTimelines.insert(movieTimeline);

		return movieTimelineId;
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
			$addToSet: {upvoters: user._id},
			$inc: {vote_count: 1}
		});
	}
});
