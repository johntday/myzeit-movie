// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
};
ownsDocumentOrAdmin = function(userId, doc) {
	return doc && (isAdmin() || doc.userId === userId );
};
/*------------------------------------------------------------------------------------------------------------------------------*/
// check if admin
isAdmin = function() {
	return (Meteor.user() &&  (Meteor.user().username === "admin"));
};

