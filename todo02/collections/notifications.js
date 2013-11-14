MOVIE_CREATED_BY_USER = 1;
MOVIE_UPDATED_BY_USER = 2;
MOVIE_UPDATED_BY_ADMIN = 3;
MOVIE_DELETED_BY_USER = 4;
MOVIE_DELETED_BY_ADMIN = 5;
FACT_CREATED_BY_USER = 6;
FACT_DELETED_BY_ADMIN = 7;
FACT_UPDATED_BY_ADMIN = 8;

notificationFactory = function(notificationType, collectionName, userId, name, status, href, created) {
	var description = "";
	if (MOVIE_CREATED_BY_USER === notificationType)
		description = "Movie '" + name + "' was created " + moment(created).fromNow();
	else if (MOVIE_UPDATED_BY_USER === notificationType)
		description = "Movie '" + name + "' was updated " + moment(created).fromNow();
	else if (MOVIE_UPDATED_BY_ADMIN === notificationType)
		description = "Your movie '" + name + "' was updated by Admin " + moment(created).fromNow();
	else if (MOVIE_DELETED_BY_ADMIN === notificationType)
		description = "Your movie '" + name + "' was deleted by Admin " + moment(created).fromNow();
	else if (FACT_CREATED_BY_USER === notificationType)
		description = "Fact '" + name + "' was created " + moment(created).fromNow();
	else if (FACT_DELETED_BY_ADMIN === notificationType)
		description = "Fact '" + name + "' was deleted by Admin" + moment(created).fromNow();
	else if (FACT_UPDATED_BY_ADMIN === notificationType)
		description = "Fact '" + name + "' was updated by Admin" + moment(created).fromNow();
	else
		return;
	return {
		notification_type: notificationType
		, description: description
		, collection_name: collectionName
		, userId: userId
		, status: status
		, href: href
		, created: created
		, read: false
	};
};
Notifications = new Meteor.Collection('notifications');
/*------------------------------------------------------------------------------------------------------------------------------*/
Notifications.allow({
	insert: function (userId, doc) {
		//return ownsDocumentOrAdmin(userId, doc);
		return false;
	},
	update: function (userId, doc, fields, modifier) {
		return ownsDocumentOrAdmin(userId, doc);
	},
	remove: function (userId, doc) {
		return ownsDocumentOrAdmin(userId, doc);
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Meteor.methods({
	deleteAllRead: function() {
		Notifications.remove({read: true});
	}
});
