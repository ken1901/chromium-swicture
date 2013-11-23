// Save this script as `options.js`

var init = 0;
var DEFAULT_DISABLEPLUGIN = 0;
var DEFAULT_SHOWIMAGES = 1;
var DEFAULT_IGNOREBACKGROUNDIMAGES = 1;
var DEFAULT_WAITFORPAGELOAD = 1;
var DEFAULT_OPACITY = 0.1;
var DEFAULT_TOGGLEONMOUSEOVER = 1;
var DEFAULT_REVEALSPEED = 1000;
var DEFAULT_EXCEPTIONS = "https://*";
var DEFAULT_IGNORENEWCONTENT = 1;

var oDisablePlugin;
var oShowImages;
var oIgnoreBackgroundImages;
var oWaitForPageload;
var oOpacity;
var oToggleOnMouseover;
var oRevealSpeed;
var oExceptions;
var oIgnoreNewContent;
var options;
var requireProtocol = 0;

var exceptionsChanged = 0;

var errCount = 0;

function setOnMouseover()
{
	if(toggleOnMouseover.checked)
	{
		document.getElementById("tdOpacity").onmouseover = function() {

			if(oToggleOnMouseover == 1)
			{
				$(this).fadeTo(oRevealSpeed, 1);
			}
		
		}

		document.getElementById("tdOpacity").onmouseout = function() {
			$(this).stop().fadeTo(1, oOpacity);
		}
	}
}

// Saves options to localStorage.
function save_options() {
  var disablePlugin = document.getElementById("disablePlugin");
  var showImages = document.getElementById("showImages");
  var ignoreBackgroundImages = document.getElementById("ignoreBackgroundImages");
  var waitForPageload = document.getElementById("waitForPageload");
  var opacity = document.getElementById("opacity");
  var toggleOnMouseover = document.getElementById("toggleOnMouseover");
  var revealSpeed = document.getElementById("revealSpeed");
  var ignoreNewContent = document.getElementById("ignoreNewContent");
  
  var exceptions = document.getElementById("exceptions");

  options = {};
  options["disablePlugin"] = oDisablePlugin = disablePlugin.checked ? 1 : 0;
  options["showImages"] = oShowImages = showImages.checked ? 1 : 0;
  options["ignoreBackgroundImages"] = oIgnoreBackgroundImages = ignoreBackgroundImages.checked ? 1 : 0;
  options["waitForPageload"] = oWaitForPageload = waitForPageload.checked ? 1 : 0;
  options["opacity"] = oOpacity = opacity.value;
  options["toggleOnMouseover"] = oToggleOnMouseover = toggleOnMouseover.checked ? 1 : 0;
  options["revealSpeed"] = oRevealSpeed = revealSpeed.value.replace("seconds", "").replace(" ","") * 1000;
  options["ignoreNewContent"] = oIgnoreNewContent = ignoreNewContent.checked ? 1 : 0;
  
  var j = jQuery.parseJSON(JSON.stringify(options));
  
  var optionsJSON = {};
  optionsJSON[$("#optionsFor").val()] = options;
  var tempOptions;
  if(localStorage["options"] == undefined)
  {
	console.log("if");
	tempOptions = {};
	console.log(localStorage);
  }
  else
  {
	tempOptions = $.parseJSON(localStorage["options"]);
  }
  
	tempOptions[$("#optionsFor").val()] = options;
	localStorage["options"] = JSON.stringify(tempOptions);
	console.log(localStorage);
  
  if(requireProtocol)
  {
	  var aExceptions = exceptions.value.trim().split("\n");
	  var i, add = 0;
	  for(i = 0; i < aExceptions.length; i++)
	  {
		if(aExceptions[i].indexOf("https://") != 0 && aExceptions[i].indexOf("http://") != 0 && exceptionsChanged)
		{
			errCount++;

			if(errCount == 1)
			{
				alert("Please add http:// or https:// protocols at the beginning of each exception");
				return;
			}
			else
			{
				add = confirm("You didn't add the protocol, do you want me to add it for you?");
			}
		}
	  }
	  
	  if(add)
	  {
		add = 0;
		exceptions.value = "";
		for(j = 0; j < aExceptions.length; j++)
		{
			if(aExceptions[j].indexOf("https://") != 0 && aExceptions[j].indexOf("http://") != 0)
			{
				aExceptions[j] = "http://" + aExceptions[j];
			}
			
			exceptions.value += aExceptions[j];
			
			if(j != aExceptions.length - 1)
				exceptions.value += "\n";
		}
	  }
	  else if(errCount > 1)
	  {
		return;
	  }
	}
  
  localStorage["exceptions"] = exceptions.value.trim();
  
  console.log(localStorage);
  
  setOnMouseover();
  
  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  //status.innerHTML = "Options Saved.";
  exceptionsChanged = 0;
  setTimeout(function() {
    status.innerHTML = "";
  }, 3000);
  
}

// Restores select box state to saved value from localStorage.
function restore_options() {

	var def = 0;
	var disablePlugin = document.getElementById("disablePlugin");
	var showImages = document.getElementById("showImages");
	var ignoreBackgroundImages = document.getElementById("ignoreBackgroundImages");
	var waitForPageload = document.getElementById("waitForPageload");
	var opacity = document.getElementById("opacity");
	var toggleOnMouseover = document.getElementById("toggleOnMouseover");
	var revealSpeed = document.getElementById("revealSpeed");
	var ignoreNewContent = document.getElementById("ignoreNewContent");
	
	var exceptions = document.getElementById("exceptions");
	
	if(localStorage["options"] == undefined)
	{
		options = {};
	}
	else
	{
		//options = JSON.stringify(localStorage["options"]);
		options = $.parseJSON(localStorage["options"]);
	}
	
	if(options[$("#optionsFor").val()] == undefined)
	{
		console.log("options for " + $("#optionsFor").val() + " undefined");
		def = 1;
		options["disablePlugin"] = DEFAULT_DISABLEPLUGIN;
		options["showImages"] = DEFAULT_SHOWIMAGES;
		options["ignoreBackgroundImages"] = DEFAULT_IGNOREBACKGROUNDIMAGES;
		options["waitForPageload"] = DEFAULT_WAITFORPAGELOAD;
		options["opacity"] = DEFAULT_OPACITY;
		options["toggleOnMouseover"] = DEFAULT_TOGGLEONMOUSEOVER;
		options["revealSpeed"] = DEFAULT_REVEALSPEED;
		options["ignoreNewContent"] = DEFAULT_IGNORENEWCONTENT;
			}
	else
	{
		options = options[$("#optionsFor").val()];
	}
	
	if(localStorage["exceptions"] == undefined)
		oExceptions = DEFAULT_EXCEPTIONS;
	else
		oExceptions = localStorage["exceptions"];

	
	oDisablePlugin = options["disablePlugin"];
	oShowImages = options["showImages"];
	oIgnoreBackgroundImages = options["ignoreBackgroundImages"];
	oWaitForPageload = options["waitForPageload"];
	oOpacity = options["opacity"];
	oToggleOnMouseover = options["toggleOnMouseover"];
	oRevealSpeed = options["revealSpeed"];
	oAlwaysHideOn = options["alwaysHideOn"];
	oIgnoreNewContent = options["ignoreNewContent"];
	
	disablePlugin.checked = (parseInt(oDisablePlugin) == 1 ? true : false); 
	showImages.checked = (parseInt(oShowImages) == 1 ? true : false); 
	ignoreBackgroundImages.checked = (parseInt(oIgnoreBackgroundImages) == 1 ? true : false);
	waitForPageload.checked = (parseInt(oWaitForPageload) == 1 ? true : false);
	opacity.value = oOpacity;
	toggleOnMouseover.checked =(parseInt(oToggleOnMouseover) == 1 ? true : false);
	revealSpeed.value = oRevealSpeed;
	ignoreNewContent.checked = (parseInt(oIgnoreNewContent) == 1 ? true : false);
	
	if(oExceptions) exceptions.value = oExceptions;
	
	//reloadOptionsFor();
	if(init == 0)
	{
		$(oExceptions.split("\n")).each(function(i){
			$('#optionsFor')
			 .append($("<option></option>")
			 .attr("value",this)
			 .text(this));
		});
		
		init = 1;
	}

	document.getElementById("revealSpeedContainer").style.display = toggleOnMouseover.checked ? "" : "none";
	
	setOnMouseover();
	
	$(function() {
	   $( "#slider-range-max" ).slider({
		  range: "max",
		  min: 0,
		  max: 0.5,
		  step:0.05,
		  value:oOpacity,
		  slide: function( event, ui ) {
			$( "#opacity" ).val( ui.value );
			document.getElementById("tdOpacity").style.opacity = ui.value;
			save_options();
		  }
		});
		
		$("#tdOpacity").fadeTo(oRevealSpeed, oOpacity);
		//document.getElementById("tdOpacity").style.opacity = oOpacity / 100;
  });
 
  $(function() {
	  $( "#slider-reveal-speed" ).slider({
		  range: "max",
		  min: 0,
		  max: 10000,
		  step:1000,
		  value:oRevealSpeed,
		  slide: function( event, ui ) {
			$( "#revealSpeed" ).val( ui.value / 1000 + ((ui.value / 1000) == 1 ? " second" : " seconds"));
			save_options();
		  }
		
		});
	});
	
	$(revealSpeed).val( (oRevealSpeed / 1000) + ((oRevealSpeed / 1000) == 1 ? " second" : " seconds"));
		
	if(def == 1)
		save_options();
}

function reloadOptionsFor()
{
	$('#optionsFor').html('<option id="optionsForDefaults" value="defaultOptions">Default Options</option>');
	
	$($("#exceptions").val().trim().split("\n")).each(function(i){
			$('#optionsFor')
			 .append($("<option></option>")
			 .attr("value",this)
			 .text(this));
		});
	
	init = 1;
}

function cleanup()
{
	var eList = document.getElementById("exceptions").value.split("\n");
	var tempOptions = $.parseJSON(localStorage["options"]);
	
	console.log(localStorage);
	console.log(eList);
	
	for(var key in tempOptions)
	{
		if(key == "defaultOptions")
			continue;
			
		var found = 0;
		
		console.log("searching for " + key);
		
		for(i = 0; i < eList.length; i++)
		{
			if(eList[i].trim() == key)
			{
				found = 1;
				
				console.log(eList[i].trim() + " == " + key);

				break;
			}
		}
		
		if(found == 0)
		{
			console.log("deleting " + key);
			delete tempOptions[key];
		}
	}
	
	localStorage["options"] = JSON.stringify(tempOptions);
	
	console.log(localStorage);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);

document.getElementById("disablePlugin").onchange = save_options;
document.getElementById("showImages").onchange = save_options;
document.getElementById("ignoreBackgroundImages").onchange = save_options;
document.getElementById("waitForPageload").onchange = save_options;
document.getElementById("fineGrain").onchange = save_options;
document.getElementById("toggleOnMouseover").onchange = function () {

	save_options();
	document.getElementById("revealSpeedContainer").style.display = this.checked ? "" : "none";
	
}

document.getElementById("imageCap").onchange = save_options;
document.getElementById("exceptions").onchange = function() {
	exceptionsChanged = 1;
	save_options;
}

document.getElementById("ignoreNewContent").onchange = save_options;
document.getElementById("optionsFor").onchange = restore_options;
document.getElementById("exceptions").onblur = function() {
	
	save_options();
	cleanup();
	reloadOptionsFor();
}

window.onbeforeunload = function() {
	cleanup();
	save_options();
}

$("#exceptions").height($("#tdLabels").height());
