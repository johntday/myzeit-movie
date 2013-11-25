Template.tmplUserItem.helpers({
    thumbnail: function() {
	    return "/img/Minion-Amazed-icon91.png";
    },
	userLink: function() {
		return "/admin/user/" + this._id;
	},
	username: function() {
		return getUserDisplayName(this);
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
