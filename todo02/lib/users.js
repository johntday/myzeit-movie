getUserDisplayName = function(user){
	return (user.profile && user.profile.name) ? user.profile.name : user.username;
};
getDocUserIdForSaving = function(doc, user) {
	return doc.userId || ((isAdmin(user)) ? "admin" : user._id);
};

Meteor.methods({
	addFavMovie: function(_id, movieId){
		Meteor.user.update(_id,
			{ $addToSet: { favs: movieId } }
		);

		Movies.update(_id,
			{ $inc: { favs_cnt: 1 } }
		);
	},

	deleteFavMovie: function(_id, movieId){
		Meteor.user.update(_id,
			{ $pull: { favs: movieId } }
		);

		Movies.update(_id,
			{ $inc: { favs_cnt: -1 } }
		);
	}

});
