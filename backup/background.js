var init = 0;

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
	show = !show;
	applyToggle();
}

function onLoad()
{
	init = 1;
	chrome.extension.sendRequest({method: "getLocalStorage", key: "defaultDisplay"}, function(response) {
		if(response != undefined)
		{
			show = response.data["showImages"] == 0 ? 0 : 1;
			ignoreBackgroundImages = response.data["ignoreBackgroundImages"] == 0 ? 0 : 1;
			opacity = response.data["opacity"] != "undefined" ? response.data["opacity"] : opacity;
			toggleOnMouseover = response.data["toggleOnMouseover"] == 0 ? 0 : 1;
			revealSpeed = response.data["revealSpeed"] != "undefined" ? parseInt(response.data["revealSpeed"]) : revealSpeed;
			alwaysDisplayOn = response.data["alwaysDisplayOn"] != "undefined" ? response.data["alwaysDisplayOn"] : alwaysDisplayOn;
			alwaysHideOn = response.data["alwaysHideOn"] != "undefined" ? response.data["alwaysHideOn"] : alwaysHideOn;
			ignoreNewContent = response.data["ignoreNewContent"] == 0 ? 0 : 1;
			
			cDisplayOn = alwaysDisplayOn.split("\n");
			cHideOn = alwaysHideOn.split("\n");
			
			for(i = 0; i < cDisplayOn.length; i++)
			{
				
				if(window.location.href.indexOf(cDisplayOn[i]) != -1)
				{
					show = 1;
					break;
				}
			}
			
			for(i = 0; i < cHideOn.length; i++)
			{
				if(window.location.href.indexOf(cHideOn[i]) != -1)
				{
					show = 0;
					break;
				}
			}
			
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