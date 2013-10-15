/*
 Template to create input form elements
 */
Handlebars.registerHelper('form_input', function(name, value) {

	return new Handlebars.SafeString(
		"<div class='form-group row'>"+
			"<label for='" + name + "' class='col-sm-2 control-label'>" + name + "</label>"+
			"<div class='col-sm-6'>"+
			"<input type='text' class='form-control' id='" + name + "' value='" + value + "' " + Meteor.MyClientModule.isReadOnly() + " />"+
			"</div>"+
			"</div>"
	);
});


Handlebars.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});

