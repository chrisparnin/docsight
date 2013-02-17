$(document).ready( function()
{
	//var appWindow = document.getElementById("app").contentWindow;
	/*chrome.topSites.get(function(topSites) {
		appWindow.postMessage({ displayLinks: topSites }, "*");
	});
	*/
   // The sandbox window can post messages to us
   window.addEventListener("message", handleMessage, false);

	getHistoryAndSendToSandbox( moment().subtract('days',5), moment() );
});

function handleMessage() 
{
	if (event.data.fiveDayRange) 
	{
		getHistoryAndSendToSandbox( moment().subtract('days',5), moment() );
   }
	else if( event.data.oneMonthRange)
	{
		getHistoryAndSendToSandbox( moment().subtract('months',1), moment() );
	}
	else if( event.data.threeMonthRange)
	{
		getHistoryAndSendToSandbox( moment().subtract('months',3), moment() );
	}
}

function getHistoryAndSendToSandbox( startDay, endDay )
{
	var appWindow = document.getElementById("app").contentWindow;
	getChromeHistory( startDay, endDay,
		function( history, start, end )
		{
			appWindow.postMessage({displayLinks: history}, "*");
		}
	);
}

function getChromeHistory(startTime,endTime,callback)
{
	var histories = [];
   var visits = 0;
   var visit_series = [];

	chrome.history.search(
		{
			text:'',
			maxResults:1000000000,
			startTime:startTime.valueOf(),
			endTime:endTime.valueOf()
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
										// Google search often includes redirects, which sets title of site to be visited next.  Replace with query.
										if( isGoogleSearch( v.url ) )
										{
											var params = getParameters( v.url );
											v.title = decodeURIComponent(params.q.replace(/\+/g," "));
										}
		
										v.isGoogleRedirect = isGoogleRedirect( v.url );

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
					var visits = visit_series.filter(isIncluded);
					// For display, we don't want adjacencies.
					visits = filterAdjacencies(visits);
					visits = filterGoogleSearchNearSite(30, visits );
				
					callback(visits,startTime,endTime);
				}
			); // end async.forEachSeries
		}
	);
}

function filterAdjacencies(visits)
{
	included = [];

	for(var i = 0; i < visits.length-1; i++)
	{
		var v = visits[i];
		var next = visits[i+1];

		if( v.url == next.url )
		{
			continue;
		}
		else if( isGoogleSearch( v.url ) && v.title == next.title )
		{
			continue;
		}
		// Redirects
		//else if( isGoogleRedirect( v.url ) )
		//{
		//	continue;
		//}
		else
		{
			included.push( v );
		}
	}

	return included;
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

function filterGoogleSearchNearSite( secondsThreshold, visits )
{
	included = [];

	for(var i = 0; i < visits.length; i++)
	{
		var v = visits[i];
		if( isGoogleSearch( v.url ) )
		{
			var searchTime = v.time;
			var docTime = visits[visits.length-1].time + 100000;
			for( var x = i+1; x < visits.length; x++ )
			{
				var d = visits[x];
				if( !isGoogleSearch( d.url ) )
				{
					docTime = d.time;
					break;
				}
			}

			if( compareVisitTimesInSeconds(docTime, searchTime) < secondsThreshold )
			{
				included.push( v );		
			}
		}
		else
		{
			included.push( v );
		}
	}
	return included;	
}

function compareVisitTimesInSeconds( a, b )
{
	return ( getLocalTime(a).valueOf() - getLocalTime(b).valueOf())  / 1000;
}

function isGoogleRedirect( url )
{
   if( url.indexOf("google") != -1 && url.indexOf("/url") != -1 )
      return true;  
	return false;
}

function isGoogleSearch( url )
{
   if( (url.indexOf("google") != -1  && url.indexOf("/search?") != -1) || 
		 (url.indexOf("google") != -1 && url.indexOf("output=search") != -1 ) ||
		 (url.indexOf("google") != -1 && url.indexOf("&q=") != -1 )
     )
      return true;  
	return false;
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

   //if( element.url.indexOf("google") != -1 &&
   //    (element.url.indexOf("search") != -1 || element.url.indexOf("webhp") != -1
   //    ||
   //    element.url.indexOf("url?") != -1)
   //    // This is a "redirect" from click...it will show twice.
   //  )
   //   return true;  
	if( isGoogleSearch( element.url ) )
		return true;

   if( element.url.indexOf("stackoverflow.com") != -1 && element.url.indexOf("careers.stackoverflow") == -1 )
      return true;
   if( element.url.indexOf("developer.android") != -1)
      return true;
   if( element.url.indexOf("groups.google.com") != -1)
      return true;
   if( element.url.indexOf("eclipse.org/forums") != -1)
      return true;
   if( element.url.indexOf("msdn") != -1)
      return true;
   if( element.url.indexOf("api.jquery.com") != -1)
      return true;
   if( element.url.indexOf("knockoutjs.com") != -1 && (element.url.indexOf("learn.") != -1  || element.url.indexOf("documentation") != -1) )
		return true;
   return false;
}

function getLocalTime(googleTime)
{
   //var date = new Date(0);
   //var time = (googleTime);
   //date.setTime( parseInt(time) );
	var date = moment( parseInt(googleTime) );	
   return date;
}

function getImportTime(googleTime)
{
   var date = new Date(0);
   var time = (googleTime);
   //console.log( time );
   date.setTime( parseInt(time)/100 );
   return date;
}

function getParameters( href )
{
   var regex = /[?&]([^=#]+)=([^&#]*)/g,
       url = href,
       params = {},
       match;
   while(match = regex.exec(url)) {
       params[match[1]] = match[2];
   }
   return params;
}

