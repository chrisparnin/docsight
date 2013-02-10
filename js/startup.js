$(document).ready( function()
{
   var storeModel = new StoreModel();
   ko.applyBindings(storeModel);

	window.addEventListener( "message", function(event) {
		if (event.data.displayLinks) {
			storeModel.appendVisits(event.data.displayLinks);
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

