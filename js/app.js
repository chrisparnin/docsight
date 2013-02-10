$(document).ready( function()
{
	var appWindow = document.getElementById("app").contentWindow;
	/*chrome.topSites.get(function(topSites) {
		appWindow.postMessage({ displayLinks: topSites }, "*");
	});
	*/

	getChromeHistory( new Date().add(-3).days(), new Date(), 
		function( history, start, end )
		{
			appWindow.postMessage({displayLinks: history }, "*");
		}
	);

});

function getChromeHistory(startTime,endTime,callback)
{
	var histories = [];
   var visits = 0;
   var visit_series = [];

	chrome.history.search(
		{
			text:'',
			maxResults:1000000000,
			startTime:startTime.getTime(),
			endTime:endTime.getTime()
		}, 
		function(historyItems)
		{
			async.forEachSeries( historyItems, 
				function(item, next)
				{
					if( item.url )
					{
						getChromeVisits(item.url, item.title, function(theVisits)
						{
							visits += theVisits.length;
							var last = null;
							for(var i = 0; i < theVisits.length; i++)
							{
								var v = theVisits[i];
								// Chrome History doesn't seem to respect endTime -- manually filter
								if( v.time >= startTime &&
									 v.time <= endTime )
								{
									// Often, multiple requests are made, resulting in duplicate visits -- only include first in sequential visits.
									if( !last || (last.title != v.title && last.url != v.url) )
									{
										visit_series.push( v );
									}
									last = v;
								}
								
							}
							next();
						});
					}
				},
				function(doneOrError)
				{
					visit_series.sort( function(a,b) {return a.time - b.time;} );
					callback(visit_series.filter(isIncluded),startTime,endTime);
				}
			); // end async.forEachSeries
		}
	);
}

function getChromeVisits(url, title, callback)
{
   chrome.history.getVisits({'url':url},
		function(visitItems)
		{
			var visits = [];
			for(var i = 0; i < visitItems.length; i++)
			{
				var v = visitItems[i];
				visits.push( {time: v.visitTime, title: title, url:url} );
			}
			callback( visits );
		}
	);
}

function isIncluded(element,index,array)
{
   if( element.url.indexOf("mail.google") != -1 /*&& element.url.indexOf("search") != -1*/)
      return false;
   if( element.url.indexOf("play.google") != -1 )
      return true;

   // 
   if( element.url.indexOf("plus.google") != -1 )
      return false;

   if( element.url.indexOf("google") != -1 &&
       (element.url.indexOf("search") != -1 || element.url.indexOf("webhp") != -1
       ||
       element.url.indexOf("url?") != -1)
       // This is a "redirect" from click...it will show twice.
     )
      return true;  
   if( element.url.indexOf("stackoverflow.com") != -1 )
      return true;
   if( element.url.indexOf("developer.android") != -1)
      return true;
   if( element.url.indexOf("groups.google.com") != -1)
      return true;
   if( element.url.indexOf("msdn") != -1)
      return true;
   if( element.url.indexOf("api.jquery.com") != -1)
      return true;
   return false;
}


