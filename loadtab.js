chrome.browserAction.onClicked.addListener(function() 
{
   chrome.tabs.create({url: chrome.extension.getURL('app.html') }, function(tab)
   {
      //done
   });
});

