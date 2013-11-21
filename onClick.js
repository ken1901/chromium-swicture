//In background.js:
// React when a browser action's icon is clicked.

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null,
                           {code: "toggle();"});
});

chrome.commands.onCommand.addListener(function(command) {
  
  if(command == "toggle-images")
	chrome.tabs.executeScript(null,
                           {code: "toggle();"});
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    
	if (request.method == "getLocalStorage")
	{
				

		var options = $.parseJSON(localStorage["options"]);
		//var options = $.parseJSON(localStorage["exceptions"]);
		var exceptions = localStorage["exceptions"].split("\n");
		var key;
		var matched = 0;
		var i, j;
		
		
		for(i = 0; i < exceptions.length; i++)
		{
			regex = exceptions[i].replace(/\*/g, "[^ ]*");
			
			if(request.key.match(regex))
			{
				key = exceptions[i];
				matched = 1;
				break;
			}
		}
		
		if(matched == 0)
		{
			key = request.key;
		}

		
		if(options[key] != undefined)
			sendResponse({data: options[key]});
		else
			sendResponse({data: options["defaultOptions"]});
	}
    else
      sendResponse({}); // snub them.
});