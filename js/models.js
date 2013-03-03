var StoreModel = function()
{
   this.stores = ko.observableArray([]);
	this.dayRange = ko.observable(5);

	this.iconCloudView = ko.observable(false);

	this.options = ko.observable({chronological:true,filters:""});

	this.appendVisits = function( visits )
	{
		if( this.options().chronological == false )
		{
			visits.reverse();
		}

		var last = visits[0].time;
		$.each(visits, 
			function(index, v) 
			{
				var deltaInSeconds = Math.abs(v.time.valueOf() - last.valueOf())/1000;
				var spacer = false;
				var needsDateHeader = false;
				var thresholdInHours= 60 * 60 * .5;
				if( last.format('L') != v.time.format('L') )
				{
					needsDateHeader = true;	
				}
				// chained so that date Header and spacer dont' both appear.
				else if( deltaInSeconds > thresholdInHours)
				{
					spacer = true;
				}
				this.stores.push( new VisitModel(v.title, v.url, getSiteKind(v.url), v.time, spacer, needsDateHeader) );
				last = v.time;
			}.bind(this)
		);

		this.stores()[0].needsDateHeader(true);
		

	}.bind(this);
};

function isGoogleSearch( url )
{
   if( (url.indexOf("google") != -1  && url.indexOf("/search?") != -1) ||
       (url.indexOf("google") != -1 && url.indexOf("output=search") != -1 ) ||
       (url.indexOf("google") != -1 && url.indexOf("&q=") != -1 )
     )
      return true;
   return false;
}

function getSiteKind(url)
{
   if( url.indexOf("play.google") != -1 )
      return "play";

   if( isGoogleSearch( url ) )
      return "google";
   if( url.indexOf("stackoverflow.com") != -1)
      return "stackoverflow";
   if( url.indexOf("developer.android") != -1)
      return "android";
   if( url.indexOf("groups.google.com") != -1)
      return "googlegroups";
   if( url.indexOf("msdn") != -1)
      return "msdn";
   if( url.indexOf("eclipse.org/forums") != -1)
      return "eclipse";
   if( url.indexOf("api.jquery.com") != -1)
      return "jquery";
   if( url.indexOf("knockoutjs") != -1)
		return "knockoutjs";
	return "";
}
	

var VisitModel = function(title, url, siteType, time, spacer, needsDateHeader )
{
	this.title = ko.observable(title);
	this.url = ko.observable(url);
	this.classKind = ko.observable(siteType);
	this.time = time;
	this.spacer  = ko.observable(spacer);
	this.needsDateHeader = ko.observable(needsDateHeader);
	//this.classKind = ko.computed(function() {
   //     return siteType;
   //}, this);

	this.friendlyTime = ko.computed(function() {
		return this.time.format('LT');
	}, this );
	this.friendlyDate = ko.computed(function() {
		//return this.time.format('dddd') + " " + this.time.format('L');
		return this.time.format('dddd, MMMM D YYYY');
	}, this );
	this.transitionsTo = ko.observableArray([]);
};
