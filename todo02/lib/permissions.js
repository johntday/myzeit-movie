// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
  return doc && userId && doc.userId === userId;
};
ownsDocumentOrAdmin = function(userId, doc) {
	return doc && userId && (isAdmin() || doc.userId === userId );
};
canEdit = function(user, doc){
	var user=(typeof user === 'undefined') ? Meteor.user() : user;

	if (!user || !doc){
		return false;
	} else if (isAdmin(user)) {
		return true;
	} else if (user._id!==doc.userId) {
		return false;
	}else {
		return true;
	}
};
canCreateMovie = function(user) {
	return (user != null);
};
// check if admin
isAdmin = function(user) {
	var u=(typeof user === 'undefined') ? Meteor.user() : user;
	return (u && u.username === "admin");
};

