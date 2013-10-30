/**
 * Template to generate INPUT form elements.
 */
Handlebars.registerHelper('form_input', function(label, name, value, canEdit, showEmpty) {
//	var showField = (value || canEdit || (showEmpty === true));
//	if (! showField)
//		return;
	if (canEdit) {
		return new Handlebars.SafeString(
			"<div class='form-group row'>" +
				"<label for='" + name + "' class='col-sm-3 control-label'>" + label + "</label>"+
				"<div class='col-sm-8'>"+
				"<input type='text' class='form-control' id='" + name + "' value='" + value + "' " + (canEdit ? "" : "readonly") + " />"+
				"</div>"+
				"</div>"
		);
	} else if (value || showEmpty === true) {
		return new Handlebars.SafeString(
			"<div class='form-group row'>" +
				"<label class='col-sm-3 control-label'>" + label + "</label>"+
				"<div class='col-sm-8'>"+
				"<p class='form-control-static'>" + value + "</p>"+
				"</div>"+
				"</div>"
		);
	}
});
/**
 * Template to generate CHECKBOX form elements.
 */
Handlebars.registerHelper('form_checkbox', function(label, name, value, canEdit, showEmpty) {
	if (canEdit) {
		return new Handlebars.SafeString(
			"<div class='form-group row'>" +
				"<label for='" + name + "' class='col-sm-3 control-label'>" + label + "</label>"+
				"<div class='col-sm-8'>"+
				"<input type='checkbox' class='form-control' id='" + name + "' " + ((value===true) ? "checked ": "") + (canEdit ? "" : " disabled") + " />"+
				"</div>"+
				"</div>"
		);
	} else if (showEmpty === true) {
		return new Handlebars.SafeString(
			"<div class='form-group row'>" +
				"<label class='col-sm-3 control-label'>" + label + "</label>"+
				"<div class='col-sm-8'>"+
				"<p class='form-control-static'>" + ((value===true) ? "Yes" : "No") + "</p>"+
				"</div>"+
				"</div>"
		);
	}
});
/**
 * Template to generate TEXTAREA form elements
 */
Handlebars.registerHelper('form_textarea', function(label, name, value, canEdit, showEmpty) {
	var showField = (value || canEdit || (showEmpty === true));
	if (! showField)
		return;

	return new Handlebars.SafeString(
		"<div class='form-group row'>" +
			"<label for='" + name + "' class='col-sm-3 control-label'>" + label + "</label>"+
			"<div class='col-sm-8'>"+
			"<textarea type='text' class='form-control' id='" + name + "' " + (canEdit ? "" : "readonly") + " >" +
			value +
			"</textarea>"+
			"</div>"+
			"</div>"
	);
});
/**
 * Template to generate STATIC TEXT form elements
 */
Handlebars.registerHelper('form_static', function(label, name, value, showEmpty) {
	var showField = (value || isAdmin() || (showEmpty === true));
	if (! showField)
		return;

	return new Handlebars.SafeString(
		"<div class='form-group row'>" +
			"<label class='col-sm-3 control-label'>" + label + "</label>"+
			"<div class='col-sm-8'>"+
			"<p class='form-control-static'>" + value + "</p>"+
			"</div>"+
			"</div>"
	);
});
/**
 * Template to generate SELECT form elements
 * options: [{id: 'a', label: 'b'}, ...]
 */
Handlebars.registerHelper('form_select', function(label, name, value, options, defaultValue, canEdit, showEmpty) {
	if (canEdit && options && options.length !=0) {
		var s = "";
		for (var i=0; i < options.length; i++) {
			s += "<option value='"+ options[i].id +"'" + ((options[i].id === value) ? " selected" : "") + ">" + options[i].label + "</option>";
		}
		return new Handlebars.SafeString(
			"<div class='form-group row'>" +
				"<label class='col-sm-3 control-label'>" + label + "</label>"+
				"<div class='col-sm-8'>"+
				"<select class='form-control' id='" + name + "'>" +
				s+
				"</select>"+
				"</div>"+
				"</div>"
		);
	} else if (value || (showEmpty === true)) {
		return new Handlebars.SafeString(
			"<div class='form-group row'>" +
				"<label class='col-sm-3 control-label'>" + label + "</label>"+
				"<div class='col-sm-8'>"+
				"<p class='form-control-static'>" + value + "</p>"+
				"</div>"+
				"</div>"
		);
	}
	return;
});
/**
 * Template to generate bootstrap-v3 alert class. Defaults to "danger".
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
