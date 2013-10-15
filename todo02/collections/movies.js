Movies = new Meteor.Collection('coll_movies');
/*------------------------------------------------------------------------------------------------------------------------------*/
Movies.allow({
    insert: isAdmin,
    update: isAdmin,
    remove: isAdmin
});
/*------------------------------------------------------------------------------------------------------------------------------*/
/* TODO
 PUT COMMON TRANSFORMATIONS HERE
 */
//Animals = new Meteor.Collection("Animals", {
//	transform: function (doc) { return new Animal(doc); }
//});
