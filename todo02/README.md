# MyZeit / todo02

## Application Structure

### Meteor Info
Application in such a way that it is insensitive to the order in which files are loaded,
for example by using Meteor.startup, or by moving load order sensitive code into [packages](http://docs.meteor.com/#usingpackages),
which can explicitly control both the load order of their contents and their load order with respect to other packages.
However sometimes load order dependencies in your application are unavoidable.
The JavaScript and CSS files in an application are loaded according to these rules:

- Files in the `lib` directory at the root of your application are loaded first.
- Files that match `main.*` are loaded after everything else.
- Files in subdirectories are loaded before files in parent directories, so that files in the deepest subdirectory are loaded first (after `lib`),
and files in the root directory are loaded last (other than `main.*`).
- Within a directory, files are loaded in alphabetical order by filename.
- These rules stack, so that within lib, for example, files are still loaded in alphabetical order; and if there are multiple files named `main.js`,
the ones in subdirectories are loaded earlier.

### Notes
- 10/10/2013: first pull

## Standards
### Prefixes
- **pubsub**: name of Meteor.publish and/or Meteor.subscribe
- **tmpl**: name of template
- **coll**: name of Collection



```
http://handlebarsjs.com/expressions.html

Handlebars.registerHelper('link', function(text, options) {
  var attrs = [];

  for(var prop in options.hash) {
    attrs.push(prop + '="' + options.hash[prop] + '"');
  }

  return new Handlebars.SafeString(
    "<a " + attrs.join(" ") + ">" + text + "</a>"
  );
});
```

## Data models
### Movie timeline

```
		var movieTimeline =
			{
				movieId: testId,
				userId: userId,
				author: "John T Day",
				created: now,
				//updated: null,
				description: "My description",
				comment_count: 10,
				upvoters: [steve._id, albert._id],
				vote_count: 2,
				data: [
					{
						'start': new Date(2010,7,23),
						'content': 'Conversation'
					},
					{
						'start': new Date(2010,7,23,23,0,0),
						'content': 'Mail from boss'
					},
					{
						'start': new Date(2010,7,24,16,0,0),
						'content': 'Report'
					},
					{
						'start': new Date(2010,7,26),
						'end': new Date(2010,8,2),
						'content': 'Traject A'
					},
					{
						'start': new Date(2010,7,28),
						'content': 'Memo'
					},
					{
						'start': new Date(2010,7,29),
						'content': 'Phone call'
					},
					{
						'start': new Date(2010,7,31),
						'end': new Date(2010,8,3),
						'content': 'Traject B'
					},
					{
						'start': new Date(2010,8,4,12,0,0),
						'content': 'Report'
					}
				]
			};
```
