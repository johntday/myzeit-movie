Package.describe({
    summary: "Package to manage users based on bootstrap-3"
});

Package.on_use(function(api) {
    api.use(['minimongo', 'mongo-livedata', 'templating', 'accounts-ui', 'accounts-password', 'email'],
	    ['client', 'server']);
    api.use(['handlebars', 'bootstrap-3'],
	    'client');
    api.add_files(['managedUsers.js'],
	    ['client', 'server']);
    api.add_files(['managedUsersTemplates.html', 'managedUsersTemplates.js', 'managedUsers.css'],
	    'client');
});

Package.on_test(function(api) {
    api.use(['tinytest', 'test-helpers'],
	    ['client', 'server']);
    api.add_files('managedUsers_tests.js',
	    ['client', 'server']);
});
