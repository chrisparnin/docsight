var OptionsStorageKey = "DocSight.V1.Options";

$(document).ready( function() 
{
	$("#submitBtn").attr('disabled','disabled');

	// load previous settings.
	chrome.storage.sync.get(OptionsStorageKey, function(entry) 
	{
		// Set previous options.
		var optionsStr = entry[OptionsStorageKey];
		if( optionsStr )
		{
		    var options = JSON.parse( optionsStr );
		    {
			    setOptions(options);
			    //alert('Settings loaded.');
		    }
		}

		// Can enable submit.
		$("#submitBtn").removeAttr('disabled');
		$("#optionsForm").submit( function() 
		{
			if( !validateOptions() )
			{
				alert('Must select an option for ordering');
				return false;
			}
			var options = getOptions();
			saveOptions(options);
			return false;
		});
	});
});		

function getOptionsExtern(callback)
{
	// load previous settings.
   chrome.storage.sync.get(OptionsStorageKey, function(entry)
   {
      // Set previous options.
      var optionsStr = entry[OptionsStorageKey];
      if( optionsStr )
      {
			var options = JSON.parse( optionsStr );
			callback( options );
		}
	});

	// Default options:
	var defaultOptions = {};
	defaultOptions["chronological"] = true; 
	defaultOptions["filters"] = "";
	return defaultOptions;
}

function validateOptions()
{
	var chron = $("#chron").is(':checked');
	var newest = $("#newest").is(':checked');

	return ( chron == true || newest == true );
}

function getOptions()
{
	var options = {};
	options.chronological = $("#chron").is(':checked');
	options.filters = $("#filters").val();
	return options;
}

function setOptions(options)
{
	if( options.chronological )
	{
		$("#chron").attr('checked', 'checked');
	}
	else
	{
		$("#newest").attr('checked', 'checked');
	}

	$("#filters").val( options.filters );
}

function saveOptions(options)
{
	// Save it using the Chrome extension storage API.
	var json = JSON.stringify( options );
	var param = {};
	param[OptionsStorageKey] = json;
	chrome.storage.sync.set( param , function() {
		if( chrome.runtime.lastError )
		{
			alert(chrome.runtime.lastError.message);
		}
	});
}

function getOptionsFoo()
{
	var options = {};
	var select = document.getElementById("color");
	for (var i = 0; i < select.children.length; i++) 
	{
		var child = select.children[i];
		if (child.value == favorite) 
		{
			child.selected = "true";
			break;
		}
	}
}
