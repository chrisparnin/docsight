$(document).ready( function()
{
	var storeModel = new StoreModel();
   ko.applyBindings(storeModel);

	window.addEventListener( "message", function(event) {
		if( event.data.options) {
			storeModel.options( event.data.options );
			postMessageToParent({ ready: true});
		}

		if (event.data.displayLinks) {

			var visits = event.data.displayLinks;
			var filteredVisits = [];
         for(var i = 0; i < visits.length; i++)
         {
				var v = visits[i];
				// http://stackoverflow.com/questions/4492947/object-passing-in-chromium-extension
				// chrome will stringify objects passed in messages.
				// transduce epoch to moment() 
				v.time = moment(v.time);
				
				// Sometimes the title is just "" ..shrug
				if( v.title == "" )
				{
					v.title = v.url;
				}

				if( storeModel.userExclude( v ) )
				{
					continue;
				}

				if( !v.isGoogleRedirect )
				{
					filteredVisits.push( v );	
				}
         }

			storeModel.appendVisits(filteredVisits);
		}
	}, false);

	////////////////////////////
	// Button handlers

	$("#exportBtn").click( function()
	{
		var blob = new Blob([ko.toJSON(storeModel)], {type: "text/plain;charset=utf-8"});
		saveAs(blob, "exportedHistory.json");
	});
	
	$("#iconCloudBtn").click( function()
	{
		$('#titleViewBtn').toggle();
		$('#iconCloudBtn').toggle();
		storeModel.iconCloudView( true );
	});
	
	$("#titleViewBtn").click( function()
	{
		$('#titleViewBtn').toggle();
		$('#iconCloudBtn').toggle();
		storeModel.iconCloudView( false );
	});
	
	$("#fiveDayBtn").click( function()
	{
		storeModel.dayRange( 5 );
		storeModel.stores( [] );
		postMessageToParent({ fiveDayRange: true });
	});

	$("#oneMonthBtn").click( function()
	{
		storeModel.dayRange(moment().diff( moment().subtract('months', 1), 'days') );
		storeModel.stores( [] );
		postMessageToParent({ oneMonthRange: true });
	});
	
	$("#threeMonthBtn").click( function()
	{
		storeModel.dayRange(moment().diff( moment().subtract('months', 3), 'days') );
		storeModel.stores( [] );
		postMessageToParent({ threeMonthRange: true });
	});

});

function postMessageToParent(message) 
{
	window.parent.postMessage(message, "*");
}

