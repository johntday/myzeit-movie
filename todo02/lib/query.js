searchTextBuilder = function(text) {
	return (text) ? "\\b" + text : "";
};
regexQuery = function (searchText) {
	return {$regex: searchText, $options: 'i'};
};
sortQuery = function (sortProperty, sortOrder) {
	var args = Array.prototype.slice.call(arguments, 0);
	var sort = {sort: {}};

	for (var i=0; i < args.length; i++) {
		sort.sort[args[i]] = args[++i];
	}
	return sort;
};
movieSort = {
	title: sortQuery('title', 1, 'release_date', -1)
	, release_date: sortQuery('release_date', -1)
	, click_cnt: sortQuery('click_cnt', -1, 'title', 1)
	, critics_score: sortQuery('ratings.critics_score', -1, 'click_cnt', -1, 'title', 1)
	, favs_cnt: sortQuery('favs_cnt', -1, 'click_cnt', -1, 'title', 1)
	, seen_cnt: sortQuery('seen_cnt', -1, 'click_cnt', -1, 'title', 1)
	, stars_cnt: sortQuery('stars_cnt', -1, 'click_cnt', -1, 'title', 1)
};
personSort = {
	name: sortQuery('name', 1, '_id', 1)
	, click_cnt: sortQuery('click_cnt', -1, 'name', 1)
	, favs_cnt: sortQuery('favs_cnt', -1, 'click_cnt', -1, 'name', 1)
};
factsSort = {
	created: sortQuery('created', -1)
	, click_cnt: sortQuery('click_cnt', -1)
};
movieTimelineSort = {
	title: sortQuery('title', 1)
	, click_cnt: sortQuery('click_cnt', -1, 'title', 1)
	, favs_cnt: sortQuery('favs_cnt', -1, 'click_cnt', -1, 'title', 1)
};
usersSort = {
	username: sortQuery('username', 1)
};
findOptions = function(sort, limit) {
	return (limit) ? _.extend(sort, {limit:limit}) : sort;
};
movieQuery = function(searchText, status) {
	return (searchText) ? {title: regexQuery(searchText)} : {};
};
favsQuery = function(searchText) {
	var userId = Meteor.userId();
	return (searchText) ? {favs: Meteor.userId(), title: regexQuery(searchText)} : {favs: ((userId) ? userId : "0")};
};
starsQuery = function(searchText) {
	var userId = Meteor.userId();
	return (searchText) ? {stars: Meteor.userId(), title: regexQuery(searchText)} : {stars: ((userId) ? userId : "0")};
};
personQuery = function(searchText) {
	return (searchText) ? {name: regexQuery(searchText)} : {};
};
factsQuery = function(movieId) {
	return (movieId) ? {movieId: movieId, status: {$lt:STATUS_REJECTED}} : {};
};
movieTimelinesQuery = function(searchText) {
	return (searchText) ? {title: regexQuery(searchText)} : {};
};
usersQuery = function(searchText) {
	return (searchText) ? {username: regexQuery(searchText)} : {};
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