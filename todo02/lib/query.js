regexQuery = function (searchText) {
	return {$regex: searchText, $options: 'i'};
};
sortQuery = function (sortProperty, sortOrder) {
	var sort = {sort: {}};
	sort.sort[sortProperty] = sortOrder;
	console.log('sort', sort);
	return sort;
};
movieSort = {
	title: sortQuery('title', 1)
	, release_date: sortQuery('release_date', -1)
	, click_cnt: sortQuery('click_cnt', -1)
	, critics_score: sortQuery('critics_score', -1)
};
factsSort = {
	created: sortQuery('created', -1)
	, click_cnt: sortQuery('click_cnt', -1)
};
movieQuery = function(searchText) {
	return (searchText) ? {title: regexQuery(searchText)} : {};
};
favsQuery = function(searchText) {
	return (searchText) ? {favs: Meteor.userId(), title: regexQuery(searchText)} : {favs: Meteor.userId()};
};
personQuery = function(searchText) {
	return (searchText) ? {name: regexQuery(searchText)} : {};
};
factsQuery = function(movieId) {
	return (movieId) ? {movieId: movieId, status: {$lt:STATUS_REJECTED}} : {};
};

// build find query object
selectPosts = function (properties) {
	var find = {};

	// Status
	if (properties.status)
		find = _.extend(find, {status: properties.status});

	// Slug
	if (properties.slug)
		find = _.extend(find, {'categories.slug': properties.slug});

	// Date
	if (properties.date) {
		find = _.extend(find, {submitted: {
			$gte: moment(properties.date).startOf('day').valueOf(),
			$lt : moment(properties.date).endOf('day').valueOf()
		}
		});
	}

	return find;
};

updateClickCnt = function(collection, _id) {
	collection.update(_id, { $inc: { click_cnt: 1 }});
	return true;
};