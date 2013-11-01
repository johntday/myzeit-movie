trackEvent = function(event, properties){
	// EJSON.stringify(value, {indent: true});
  console.log('trackevent: ', event, properties);
  var properties= (typeof properties === 'undefined') ? {} : properties;
  //TODO add event to an Events collection for logging and buffering purposes
//  if(Meteor.isClient){
//    if(typeof mixpanel.track !== 'undefined'){
//      mixpanel.track(event, properties);
//    }
//    if(typeof GoSquared !== 'undefined' && typeof GoSquared.DefaultTracker !== 'undefined'){
//      GoSquared.DefaultTracker.TrackEvent(event, JSON.stringify(properties));
//    }
//  }
};
