var StoreModel = function()
{
   this.stores = ko.observableArray([]);

	this.appendVisits = function( visits )
	{
		$.each(visits, 
			function(index, v) 
			{
				this.stores.push( new VisitModel(v.title, v.url) );
			}.bind(this)
		);
	}.bind(this);
};

var VisitModel = function(title, url)
{
	this.title = ko.observable(title);
	this.url = ko.observable(url);

	this.transitionsTo = ko.observableArray([]);
};
