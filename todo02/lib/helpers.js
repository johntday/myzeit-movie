MyLog = function(codePath, name, object) {
	if (isMyDebug) {
		if (object)
			console.log(codePath + " [" + name + "] " + JSON.stringify(object));
		else
			console.log(codePath + " [" + name + "]");
	}
};
isTestUserId = function(userId) {
	if (!userId) return false;
	return false;
};
getNow = function() {
	return new Date().getTime();
};
setDefault = function(value, defaultValue) {
	return (value) ? value : defaultValue;
};
getMpaaOptions = function() {
	return [{id:'G',label:'G'},{id:'PG',label:'PG'},{id:'PG-13',label:'PG-13'},{id:'R',label:'R'},{id:'NC-17',label:'NC-17'},{id:'M',label:'M'},{id:'X',label:'X'},{id:'Unrated',label:'Not Rated'}];
};
getMovieSortingOptions = function() {
	return [{id:'title',label:'title'},{id:'release_date',label:'release date'},{id:'click_cnt',label:'most viewed'},{id:'critics_score',label:'top rated'},{id:'favs_cnt',label:'most favs'},{id:'seen_cnt',label:'most seen'}];
};
getTimelineSortingOptions = function() {
	return [{id:'title',label:'title'}];
};
getPersonSortingOptions = function() {
	return [{id:'name',label:'name'},{id:'click_cnt',label:'most viewed'},{id:'favs_cnt',label:'most favs'}];
};
getUserSortingOptions = function() {
	return [{id:'username',label:'username'}];
};
getMovieStatusOptions = function() {
	return [{id:STATUS_PENDING,label:'Pending'},{id:STATUS_APPROVED,label:'Approved'},{id:STATUS_REJECTED,label:'Rejected'}];
};
getMovieStatusLabel = function(status_id) {
	var s = _.find( getMovieStatusOptions(),
		function(obj){
			return (obj.id === status_id);
		}
	);
	return (s) ? s.label : '';
};
formatReleaseDateForDisplay = function(textDate/*YYYY-MM-DD*/) {
	if (! textDate)
		return "";
	return moment(textDate, 'YYYY-MM-DD').format('MM/DD/YYYY');
};
formatReleaseDateForSave = function(textDate/*MM/DD/YYYY*/) {
	if (! textDate)
		return "";
	return moment(textDate, 'MM/DD/YYYY').format('YYYY-MM-DD');
};
isFav = function(favs) {
	var user = Meteor.user();
	if(!user) return false;
	return _.contains(favs, user._id);
};
hasSeen = function(seen) {
	var user = Meteor.user();
	if(!user) return false;
	return _.contains(seen, user._id);
};
getSetting = function(view, name, valueDefault) {
	var user = Meteor.user();
	if (!user || !user.settings)
		return valueDefault;
	for (var i=0; i < user.settings.length; i++) {
		if ( view===user.settings[i].view && name===user.settings[i].name )
			return user.settings[i].value;
	}
	return valueDefault;
};
setSetting = function(view, name, value) {
	Meteor.users.update(
		Meteor.userId(),
		{ $addToSet: { settings: {view:view, name:name, value:value} } }
	);
};
// ---------------------------------- String Helper Functions ----------------------------------- //
cleanUp = function(s){
	return stripHTML(s).trim();
};
stripHTML = function(s){
	return s.replace(/<(?:.|\n)*?>/gm, '');
};
trimWords = function(s, numWords) {
	expString = s.split(/\s+/,numWords);
	if(expString.length >= numWords)
		return expString.join(" ")+"…";
	return s;
};