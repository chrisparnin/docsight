var StoreModel = function()
{
   this.stores = ko.observableArray([]);
	this.dayRange = ko.observable(5);

	this.iconCloudView = ko.observable(false);

	this.options = ko.observable({chronological:true,filters:""});

	buildRegexCache();

	this.userExclude = function ( visit )
	{
		if( this.options().filters == "" )
			return false;

		var filters = this.options().filters.split( "\n" );
		for( var i = 0; i < filters.length; i++ )
		{
			var filter = filters[i];
			// trim spaces
			filter = filter.replace(/^\s+|\s+$/g, '');

			// guard against empty filter expressions.
			if( filter == "" )
				continue;

			// startswith
			if( filter.lastIndexOf("@exclude",0) === 0 )
			{
				var atoms = filter.split(/@exclude\s+/)
				if( atoms.length == 2 )
				{
					var pattern = atoms[1];
					var regex = convert2RegExp( pattern );
					if( visit.url.match( regex ) )
					{
						return true;
					}
				}
			}
			// OLD STYLE: Javascript regex
			else
			{
				var pattern = new RegExp( filter );
				if( visit.title.search( pattern ) != -1)
				{
					return true;
				}
				if( visit.url.search( pattern ) != -1)
				{
					return true;
				}
			}
		}
		return false;
	}.bind(this);


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
	if( isGoogleSearch( url ) )
	{
		return "google";
	}

	for( var i = 0; i < filtersPresets.include_patterns.length; i++ )
   {
		var site = filtersPresets.include_patterns[i];
		if( site.ico == "" )
			continue;

      for( var u = 0; u < site.urls.length; u++ )
      {
			var pattern = site.urls[u];
			var regex = filtersPresets.regex_cache[pattern];
			if( regex && url.match( regex ) )
			{
				return site.ico;
			}
		}
	}
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
