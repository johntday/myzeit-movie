Meteor.methods({
	getMovieFromRottenTomatoes: function (q) {
		//console.log("at getMovieFromRottenTomatoes");
		//			check(userId, String);
		this.unblock();
		try {
			console.log("q='"+q+"'");
			var apikey = "9gxg34a7w2efakdhxmepxm8e";
			var page_limit = 1;
			var page = 1;
			return HTTP.call("GET", "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
				{params: {q: q, apikey: apikey, page_limit: page_limit, page: page}});
		} catch (e) {
			// Got a network error, time-out or HTTP error in the 400 or 500 range.
			console.log(JSON.stringify(e));
			return false;
		}
	},

	getCastFromRottenTomatoes: function (id_rt) {
		//console.log("at getCastFromRottenTomatoes");
		if (! id_rt || id_rt.length == 0)
			return false;
		this.unblock();
		try {
			var apikey = "9gxg34a7w2efakdhxmepxm8e";
			return HTTP.call("GET", "http://api.rottentomatoes.com/api/public/v1.0/movies/" + id_rt + "/cast.json",
				{params: {apikey: apikey}});
		} catch (e) {
			// Got a network error, time-out or HTTP error in the 400 or 500 range.
			console.log(JSON.stringify(e));
			return false;
		}
	}

});
