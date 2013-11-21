var init = 0;

var disablePlugin = 0;
var show = 1;
var opacity = 0.1;
var toggleOnMouseover = 1;
var revealSpeed = 1000;
var ignoreBackgroundImages = 1;
var ignoreNewContent = 1;

var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
};

function applyOnMouseover(node)
{
        if(disablePlugin) return;


	if(toggleOnMouseover)
	{
		node.onmouseover = function(){
			$(node).fadeTo(revealSpeed, 1.0);
		}
		
		node.onmouseout = function() {
			if(!show)
			{
				$(node).stop().fadeTo(1, opacity);
			}
		}
	}
}

function applyToggle()
{
        if(disablePlugin) return;

	$("img").each(function(i) {
	
		$(this).stop().fadeTo(1, show ? 1.0 : opacity);
		applyOnMouseover(this);
	
	});
	
	if(!ignoreBackgroundImages)
	{
	
		/*
		var images = $(":not(img, body, header)").filter(function() {
		//var images = $("div").filter(function() {
		
			return $(this).css('background-image').trim() != 'none' && $(this).css('background-image').indexOf("url(") == 0;
		});
		
			
		
		for(i = 0; i < images.length; i++)
		{
			//$(images[i]).stop().fadeTo(1, show ? 1.0 : opacity);
			//applyOnMouseover(images[i]);
			//console.log(images[i].nodeName + " -->" + $(images[i]).css('background-image') + "<--");
		}
		*/
		
		walk_the_DOM(document.body, function(node) {
			if(node.nodeType == 1)
			{
				if(node.nodeName.toLowerCase() != "img")
				{
					if(node.style.backgroundImage != "none" && node.style.backgroundImage != "")
					{
						//console.log(node.nodeName + "-->" + node.style.backgroundImage);
						$(node).stop().fadeTo(1, show ? 1.0 : opacity);
						
						applyOnMouseover(node);
					}
				}
			}
		});
		
	}
	
}

function toggle()
{
        if(disablePlugin) return;
	show = !show;
	applyToggle();
}

function onLoad()
{
	init = 1;
	var oKey = window.location.href;
	
	chrome.extension.sendRequest({method: "getLocalStorage", key: oKey}, function(response) {
	
		if(response != undefined)
		{
			var options = response.data;
console.log(options);
                        disablePlugin = options["disablePlugin"] == 0 ? 0 : 1;

                        if(disablePlugin) return;

			show = options["showImages"] == 0 ? 0 : 1;
			ignoreBackgroundImages = options["ignoreBackgroundImages"] == 0 ? 0 : 1;
			opacity = options["opacity"] != "undefined" ? options["opacity"] : opacity;
			toggleOnMouseover = options["toggleOnMouseover"] == 0 ? 0 : 1;
			revealSpeed = options["revealSpeed"] != "undefined" ? parseInt(options["revealSpeed"]) : revealSpeed;
			alwaysDisplayOn = options["alwaysDisplayOn"] != "undefined" ? options["alwaysDisplayOn"] : alwaysDisplayOn;
			alwaysHideOn = options["alwaysHideOn"] != "undefined" ? options["alwaysHideOn"] : alwaysHideOn;
			ignoreNewContent = options["ignoreNewContent"] == 0 ? 0 : 1;
			
			applyToggle();
			
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
			
			if(ignoreNewContent != 1)
			{
				// select the target node
				var target = document.querySelector('body');
				  
				// create an observer instance
				var observer = new MutationObserver(function(mutations) {
				  mutations.forEach(function(mutation) {
					console.log(mutation.type);
					applyToggle();
				  });    
				});
				  
				// configuration of the observer:
				//var config = { attributes: true, childList: true, characterData: true };
				var config = { childList: true };
				  
				// pass in the target node, as well as the observer options
				observer.observe(target, config);
				  
				// later, you can stop observing
				//observer.disconnect();
			}
		}
	});
}

//onLoad();
document.body.onload = onLoad;
