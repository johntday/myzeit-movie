Template.tmplHeader.events({
	// KEYUP SEARCH FIELD
	'keyup #header-search': function(e) {
		e.preventDefault();
		var value = String(e.target.value || "");

		if (!value)
			moviesHandle.reset(Meteor.MyClientModule.appConfig.pageLimit);
		else if (e.which === 27/*ESC*/)
			return;
		else if (e.which === 13/*ENTER*/ && value.length > 1)
			moviesHandle.reset(Meteor.MyClientModule.appConfig.pageLimitMax);
		else if (value.length < 3)
			moviesHandle.reset(Meteor.MyClientModule.appConfig.pageLimitMid);
		else
			moviesHandle.reset(Meteor.MyClientModule.appConfig.pageLimitMax);

		//console.log("event: {type: '"+ e.type+"' value: '"+value+"'}");
		Session.set("search_text", value);
	},
	// CLICK RESET BUTTON
	'click #header-search-reset': function(e) {
		e.preventDefault();
		moviesHandle.reset(Meteor.MyClientModule.appConfig.pageLimit);
		Session.set("search_text", "");
	}
});

Template.tmplHeader.helpers({
	searchText: function() {
		return Session.get("search_text");
	}
});