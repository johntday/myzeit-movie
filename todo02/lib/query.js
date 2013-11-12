regexQuery = function (searchText) {
	return {$regex: searchText, $options: 'i'};
};
sortQuery = function (sortProperty, sortOrder) {
	var sort = {sort: {}};
	sort.sort[sortProperty] = sortOrder;
	return sort;
};
movieSort = {
	title: sortQuery('title', 1)
	, release_date: sortQuery('release_date', -1)
	, click_cnt: sortQuery('click_cnt', -1)
	, critics_score: sortQuery('critics_score', -1)
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

// build sort query object
sortPosts = function (sortProperty) {
	var sort = {sort: {sticky: -1}};
	sort.sort[sortProperty] = -1;
	sort.sort._id = 1;
	return sort;
};

selectDigest = function (mDate) {
	return _.extend({
		submitted: {
			$gte: mDate.startOf('day').valueOf(),
			$lt : mDate.endOf('day').valueOf()
		}
	}, selectPosts({status: STATUS_APPROVED}));
};

sortDigest = function () {
	return {sort: {baseScore: -1, _id: 1}};
};

findDigestPosts = function (mDate) {
	return Posts.find(selectDigest(mDate), sortDigest());
};
