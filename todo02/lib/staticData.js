/**
 * Dropdown (select/options) data
 * sorts are related to query.js
 */
getMpaaOptions = function() {
	return [{id:'G',label:'G'},{id:'PG',label:'PG'},{id:'PG-13',label:'PG-13'},{id:'R',label:'R'},{id:'NC-17',label:'NC-17'},{id:'M',label:'M'},{id:'X',label:'X'},{id:'Unrated',label:'Not Rated'}];
};
getMovieSortingOptions = function() {
	return [{id:'title',label:'title'},{id:'release_date',label:'release date'},{id:'click_cnt',label:'most viewed'},{id:'critics_score',label:'top rated'},{id:'favs_cnt',label:'most favs'},{id:'seen_cnt',label:'most seen'}];
};
getTimelineSortingOptions = function() {
	return [{id:'title',label:'title'},{id:'click_cnt',label:'most viewed'},{id:'favs_cnt',label:'most favs'}];
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
