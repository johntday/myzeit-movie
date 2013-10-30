Package.describe({
  summary: "mycrossfilter"
});

Package.on_use(function (api) {
	api.add_files(['crossfilter.js'],
		['client', 'server']);
});
