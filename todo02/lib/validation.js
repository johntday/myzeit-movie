isIntegerBetween = function(value, low, high) {
	var isInt = Match.test(parseInt( value ), Match.Integer);
	if (!isInt)
		return false;

	return (value > low && value < high);
};
isValidMovieYear = function(value) {
	return isIntegerBetween(value, 1900, moment().years() + 5 /*movies in production*/);
};

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
};
validateYear = function(year) {
	if (year && !isValidMovieYear(year) ) {
		throwError("Please enter a valid 'Year' (e.g. 1978)");
		return true;
	}
	return false;
};
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
};
validateRuntime = function(runtime) {
	if (runtime && !isIntegerBetween(runtime, 1, 999) ) {
		throwError("Please enter a valid 'Runtime' in minutes (e.g. 90)");
		return true;
	}
	return false;
};
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
};
validateMovie = function(movie) {
	var hasInputError = validateTitle(movie.title, 3)
		|| validateYear(movie.year)
		|| validateOriginalTitle(movie.original_title)
		|| validateRuntime(movie.runtime)
		|| validateTagline(movie.tagline);

	return hasInputError;
};
/**
 * Transform movie before save.
 */
transformMovie = function(movie) {
	movie.year = setDefault( parseInt( movie.year ), -1 );
	movie.runtime = setDefault( parseInt( movie.runtime ), -1 );
	return movie;
};
validatePersonName = function(name) {
	if (name) {
		var nameArray = name.split(" ", 4);
		if (nameArray.length > 1) {/*more than 1 word*/
			for (var i=0; i < nameArray.length; i++) {
				if (nameArray[i].length > 2)/*more than 2 chars*/
					return false;
			}
		}
	}
	throwError("Please enter valid name");
	return true;
};
validatePerson = function(person) {
	var hasInputError = validatePersonName(person.name);
	return hasInputError;
};
/**
 * Transform person before save.
 */
transformPerson = function(person) {
	return person;
};

validateFactText = function(text, min, max) {
	if (! text) {
		throwError("Please add a fact");
		return true;
	}
	if (text.length < min) {
		throwError("Please add more than " + (min-1) + " characters");
		return true;
	}
	if (text.length > max) {
		throwError("Limit fact text to " + max + " characters");
		return true;
	}
	return false;
};
validateFact = function(fact) {
	var hasInputError = validateFactText(fact.text, 10, 2048);

	return hasInputError;
};
transformFact = function(fact) {
	fact.text = cleanUp(fact.text);
	return fact;
};