var StoreModel = function()
{
   this.stores = ko.observableArray([]);

	this.appendVisits = function( visits )
	{
		$.each(visits, 
			function(index, v) 
			{
				this.stores.push( new VisitModel(v.title, v.url, getSiteKind(v.url)) );
			}.bind(this)
		);
	}.bind(this);
};

function getSiteKind(url)
{
   if( url.indexOf("play.google") != -1 )
      return "play";

   if( url.indexOf("google") != -1 &&
      (url.indexOf("search") != -1 || url.indexOf("webhp") != -1 || url.indexOf("url?") != -1)
     )
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
	

var VisitModel = function(title, url, siteType )
{
	this.title = ko.observable(title);
	this.url = ko.observable(url);
	this.classKind = ko.observable(siteType);
	//this.classKind = ko.computed(function() {
   //     return siteType;
   //}, this);

	this.transitionsTo = ko.observableArray([]);
};
