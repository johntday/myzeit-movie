getNow = function() {
	return new Date().getTime();
};
isIntegerBetween = function(value, low, high) {
	var isInt = Match.test(parseInt( value ), Match.Integer);
	if (!isInt)
		return false;

	return (value > low && value < high);
};
isValidMovieYear = function(value) {
	return isIntegerBetween(value, 1900, moment().years() + 5 /*movies in production*/);
};
setDefault = function(value, defaultValue) {
	return (value) ? value : defaultValue;
};
getMpaaOptions = function() {
	return [{id:'G',label:'G'},{id:'PG',label:'PG'},{id:'PG-13',label:'PG-13'},{id:'R',label:'R'},{id:'NC-17',label:'NC-17'},{id:'M',label:'M'},{id:'X',label:'X'},{id:'Unrated',label:'Not Rated'}];
};
getMovieStatusOptions = function() {
	return [{id:STATUS_PENDING,label:'STATUS_PENDING'},{id:STATUS_APPROVED,label:'STATUS_APPROVED'},{id:STATUS_REJECTED,label:'STATUS_REJECTED'}];
};
