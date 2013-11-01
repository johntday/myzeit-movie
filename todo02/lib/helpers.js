getNow = function() {
	return new Date().getTime();
}
isIntegerBetween = function(value, low, high) {
	var isInt = Match.test(parseInt( value ), Match.Integer);
	if (!isInt)
		return false;

	return (value > low && value < high);
}
isValidMovieYear = function(value) {
	return isIntegerBetween(value, 1900, moment().years() + 5 /*movies in production*/);
}
setDefault = function(value, defaultValue) {
	return (value) ? value : defaultValue;
}
getMpaaOptions = function() {
	return [{id:'G',label:'G'},{id:'PG',label:'PG'},{id:'PG-13',label:'PG-13'},{id:'R',label:'R'},{id:'NC-17',label:'NC-17'},{id:'M',label:'M'},{id:'X',label:'X'},{id:'Unrated',label:'Not Rated'}];
}
getMovieStatusOptions = function() {
	return [{id:STATUS_PENDING,label:'STATUS_PENDING'},{id:STATUS_APPROVED,label:'STATUS_APPROVED'},{id:STATUS_REJECTED,label:'STATUS_REJECTED'}];
}
formatReleaseDateForDisplay = function(textDate/*YYYY-MM-DD*/) {
	if (! textDate)
		return "";
	return moment(textDate, 'YYYY-MM-DD').format('MM/DD/YYYY');
}
formatReleaseDateForSave = function(textDate/*MM/DD/YYYY*/) {
	if (! textDate)
		return "";
	return moment(textDate, 'MM/DD/YYYY').format('YYYY-MM-DD');
}
/**
 * Validations on client side.
 */
validateTitle = function(title, NCHARS) {
	if (! title) {
		throwError("Please add a 'Title'");
		return true;
	}
	if (title.length < NCHARS) {
		throwError("Please add a 'Title' more than " + (NCHARS-1) + " characters");
		return true;
	}
	return false;
}
validateYear = function(year) {
	if (year && !isValidMovieYear(year) ) {
		throwError("Please enter a valid 'Year' (e.g. 1978)");
		return true;
	}
	return false;
}
//validateReleaseDate = function(release_date/*MM/DD/YYYY*/) {
//	if (! release_date)
//		return false;
//	if (moment(release_date, 'MM/DD/YYYY').isValid() === false) {
//		throwError("Please enter a valid release date");
//		return true;
//	}
//	return false;
//}
validateOriginalTitle = function(original_title, NCHARS) {
	if (! original_title) {
		return false;
	}
	if (original_title.length < NCHARS) {
		throwError("Please add an 'Original Title' more than " + (NCHARS-1) + " characters");
		return true;
	}
	return false;
}
validateRuntime = function(runtime) {
	if (runtime && !isIntegerBetween(runtime, 1, 999) ) {
		throwError("Please enter a valid 'Runtime' in minutes (e.g. 90)");
		return true;
	}
	return false;
}
validateTagline = function(tagline) {
	if (! tagline) {
		return false;
	}
	var low=5, high=100;
	if (tagline.length < low || tagline.length > high) {
		throwError("Please add a 'Tagline' between " + low + " and " + high + " characters long");
		return true;
	}
	return false;
}
validateMovie = function(movie) {
	var hasInputError = validateTitle(movie.title, 3)
		|| validateYear(movie.year)
		|| validateOriginalTitle(movie.original_title)
		|| validateRuntime(movie.runtime)
		|| validateTagline(movie.tagline);

	return hasInputError;
}
/**
 * Transform movie before save.
 */
transformMovie = function(movie) {
	movie.year = setDefault( parseInt( movie.year ), -1 );
	movie.runtime = setDefault( parseInt( movie.runtime ), -1 );
	return movie;
}