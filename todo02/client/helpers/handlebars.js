/**
 * Template to generate input form elements
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

/**
 * Template to generate bootstrap-v3 alert class
 */
Handlebars.registerHelper('alert_class', function(messageType) {
	var alertClass = "alert alert-dismissable alert-";
	if (messageType === "i") {
		alertClass += "info";
	} else 	if (messageType === "w") {
		alertClass += "warning";
	} else 	if (messageType === "s") {
		alertClass += "success";
	} else {
		alertClass += "danger";
	}
	return new Handlebars.SafeString(alertClass);
});

/**
 * LEGACY - remove me later TODO
 */
Handlebars.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});
