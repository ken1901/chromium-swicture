// Save this script as `options.js`

var DEFAULT_SHOWIMAGES = 1;
var DEFAULT_IGNOREBACKGROUNDIMAGES = 1;
var DEFAULT_OPACITY = 0.1;
var DEFAULT_TOGGLEONMOUSEOVER = 1;
var DEFAULT_REVEALSPEED = 1000;
var DEFAULT_ALWAYSDISPLAYON = "*.google.com/*\n*.youtube.com/*\nwikipedia.org/*\namazon.com/*\ninstagram.com/*";
var DEFAULT_ALWAYSHIDEON = "*.facebook.com/*\nimgur.com/*";
var DEFAULT_IGNORENEWCONTENT = 1;

var oShowImages;
var oIgnoreBackgroundImages;
var oOpacity;
var oToggleOnMouseover;
var oRevealSpeed;
var oAlwaysDisplayOn;
var oAlwaysHideOn;
var oIgnoreNewContent;

function setOnMouseover()
{
	if(toggleOnMouseover.checked)
	{
		document.getElementById("tdOpacity").onmouseover = function() {

		if(oToggleOnMouseover == 1)
		{
			$(this).fadeTo(oRevealSpeed, 1.0);
		}
		
	}

		document.getElementById("tdOpacity").onmouseout = function() {
			$(this).stop().fadeTo(1, oOpacity);
		}
	}
}

// Saves options to localStorage.
function save_options() {
  var showImages = document.getElementById("showImages");
  var ignoreBackgroundImages = document.getElementById("ignoreBackgroundImages");
  var opacity = document.getElementById("opacity");
  var toggleOnMouseover = document.getElementById("toggleOnMouseover");
  var revealSpeed = document.getElementById("revealSpeed");
  var alwaysDisplayOn = document.getElementById("alwaysDisplayOn");
  var alwaysHideOn = document.getElementById("alwaysHideOn");
  var ignoreNewContent = document.getElementById("ignoreNewContent");

  var options = new Array();
  
  options["showImages"] = oShowImages = showImages.checked ? 1 : 0;
  options["ignoreBackgroundImages"] = oIgnoreBackgroundImages = ignoreBackgroundImages.checked ? 1 : 0;
  options["opacity"] = oOpacity = opacity.value;
  options["toggleOnMouseover"] = oToggleOnMouseover = toggleOnMouseover.checked ? 1 : 0;
  options["revealSpeed"] = oRevealSpeed = revealSpeed.value.replace("seconds", "").replace(" ","") * 1000;
  options["alwaysDisplayOn"] = oAlwaysDisplayOn = alwaysDisplayOn.value;
  options["alwaysHideOn"] = oAlwaysHideOn = alwaysHideOn.value;
  
  alert($("#optionsFor").val());
  
//alert(JSON.stringify(localStorage));
  //var j = eval("(" + JSON.stringify(localStorage) + ")");
  //var j = JSON.stringify(localStorage);
  //var j = jQuery.parseJSON(JSON.stringify(localStorage));
  var optionsJSONstring = '{"' $("#optionsFor").val() + '": ' + JSON.stringify(options) + '}';
  var j = jQuery.parseJSON(optionsJSONstring);
  
  setOnMouseover();
  
  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 3000);
  
}

// Restores select box state to saved value from localStorage.
function restore_options() {

	var def = 0;
	var showImages = document.getElementById("showImages");
	var ignoreBackgroundImages = document.getElementById("ignoreBackgroundImages");
	var opacity = document.getElementById("opacity");
	var toggleOnMouseover = document.getElementById("toggleOnMouseover");
	var revealSpeed = document.getElementById("revealSpeed");
	var alwaysDisplayOn = document.getElementById("alwaysDisplayOn");
	var alwaysHideOn = document.getElementById("alwaysHideOn");
	var ignoreNewContent = document.getElementById("ignoreNewContent");
	
	oShowImages = localStorage["showImages"];
	oIgnoreBackgroundImages = localStorage["ignoreBackgroundImages"];
	oOpacity = localStorage["opacity"];
	oToggleOnMouseover = localStorage["toggleOnMouseover"];
	oRevealSpeed = localStorage["revealSpeed"];
	oAlwaysDisplayOn = localStorage["alwaysDisplayOn"];
	oAlwaysHideOn = localStorage["alwaysHideOn"];
	oIgnoreNewContent = localStorage["ignoreNewContent"];
  
	if (oShowImages == undefined) {
		def = 1;
		showImages.checked = oShowImages = localStorage["showImages"] = DEFAULT_SHOWIMAGES;
	}
	
	if(oIgnoreBackgroundImages == undefined) {
		ignoreBackgroundImages.checked = oIgnoreBackgroundImages = localStorage["ignoreBackgroundImages"] = DEFAULT_IGNOREBACKGROUNDIMAGES;
	}
	
	if(oOpacity == undefined) {
		opacity.value = oOpacity = localStorage["opacity"] = DEFAULT_OPACITY;
	}
	
	
	if (oToggleOnMouseover == undefined) {
		toggleOnMouseover.checked = oToggleOnMouseover = localStorage["showImages"] = DEFAULT_TOGGLEONMOUSEOVER;
	}
	
	if (oRevealSpeed == undefined || oRevealSpeed == "NaN") {
		revealSpeed.value = oRevealSpeed = localStorage["revealSpeed"] = DEFAULT_REVEALSPEED;
	}
	
	if (oAlwaysDisplayOn == undefined) {
		alwaysDisplayOn.value = oAlwaysDisplayOn = localStorage["alwaysDisplayOn"] = DEFAULT_ALWAYSDISPLAYON;
	}
	
	if (oAlwaysHideOn == undefined) {
		alwaysHideOn.value = oAlwaysHideOn = localStorage["alwaysHideOn"] = DEFAULT_ALWAYSHIDEON;
	}
	
	if (oIgnoreNewContent == undefined) {
		ignoreNewContent.checked = oIgnoreNewContent = localStorage["ignoreNewContent"] = DEFAULT_IGNORENEWCONTENT;
	}	
	
	if(oShowImages) showImages.checked = oShowImages == 1 ? true : false; 
	if(oIgnoreBackgroundImages) ignoreBackgroundImages.checked = oIgnoreBackgroundImages == 1 ? true : false;
	if(oOpacity) opacity.value = oOpacity;
	if(oToggleOnMouseover) toggleOnMouseover.checked = oToggleOnMouseover == 1 ? true : false;
	if(oRevealSpeed) revealSpeed.value = oRevealSpeed;
	if(oAlwaysDisplayOn) alwaysDisplayOn.value = oAlwaysDisplayOn;
	if(oAlwaysHideOn) alwaysHideOn.value = oAlwaysHideOn;
	if(oIgnoreNewContent) ignoreNewContent.checked = oIgnoreNewContent == 1 ? true : false;
	
	$(oAlwaysDisplayOn.split("\n")).each(function(i){
		$('#optionsFor')
         .append($("<option></option>")
         .attr("value",this)
         .text(this));
	});
	
	$(oAlwaysHideOn.split("\n")).each(function(i){
		$('#optionsFor')
         .append($("<option></option>")
         .attr("value",this)
         .text(this));
	});
	
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
  
		$("#slider1").timeslider({
            sliderOptions: {
    	        range: true, 
		        min: 0, 
		        max: 1435, 
		        values: [480, 1020],
		        step:5
            },

			clockFormat: 12, // formats gor get time. Available 12, 24
			startTime: "8:00", // startTime and endTime values will override sliderOptions.values
			endTime: "17:00",
            errorMessage: '#max1',
            timeDisplay: '#time1',
            submitButton: '#schedule-submit1',
            clickSubmit: function (e){
                var that = $(this).siblings('#slider1');
                
                $('#schedule1 tbody').append('<tr>' +
                    '<td>' + that.attr('id') + '</td>' +
                    '<td>' + that.timeslider('getTime', that.slider("values", 0)) + '</td>' + 
        	        '<td>' + that.timeslider('getTime', that.slider("values", 1)) + '</td>' + 
			        '</tr>');
                e.preventDefault(); 
            }
	    });
		
		if(def == 1)
			save_options();
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);

document.getElementById("showImages").onchange = save_options;
document.getElementById("ignoreBackgroundImages").onchange = save_options;
document.getElementById("fineGrain").onchange = save_options;
document.getElementById("toggleOnMouseover").onchange = function () {

	save_options();
	document.getElementById("revealSpeedContainer").style.display = this.checked ? "" : "none";
	
}

document.getElementById("imageCap").onchange = save_options;
document.getElementById("alwaysDisplayOn").onkeyup = document.getElementById("alwaysHideOn").onkeyup = save_options;
document.getElementById("alwaysDisplayOn").onblur = document.getElementById("alwaysHideOn").onblur = save_options;
document.getElementById("ignoreNewContent").onchange = save_options;
