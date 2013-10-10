Movies = new Meteor.Collection('movies');

Movies.allow({
    insert: isAdmin,
    update: isAdmin,
    remove: isAdmin
});
