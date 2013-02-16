$(document).ready( function()
{
   var storeModel = new StoreModel();
   ko.applyBindings(storeModel);

	window.addEventListener( "message", function(event) {
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

				if( !v.isGoogleRedirect )
				{
					filteredVisits.push( v );	
				}
         }

			storeModel.appendVisits(filteredVisits);
		}
	}, false);

   /*storeModel.loadStores(
      function(){
         $('.datastore').click( function() {
            var name = $(this).first('span').text().trim();
            chrome.tabs.create({url: chrome.extension.getURL('popup.html?name=' + encodeURIComponent(name)) }, function(tab)
            {
               //done
            });
         });
      }
   );
	*/
});

