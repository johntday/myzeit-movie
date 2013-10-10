// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
};

isAdmin = function(userId) {
	var adminUser = Meteor.users.findOne({username:"admin"});
	return (userId && adminUser && userId === adminUser._id);
};
