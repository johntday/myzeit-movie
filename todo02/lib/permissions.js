// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
};

// check if admin
isAdmin = function(userId) {
	if (!userId)
		userId = Meteor.userId();
	var adminUser = Meteor.users.findOne({username:"admin"});
	return (userId && adminUser && userId === adminUser._id);
};
