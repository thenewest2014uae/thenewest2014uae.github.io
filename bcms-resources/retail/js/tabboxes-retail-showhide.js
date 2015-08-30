$(document).ready(function(){	
	// when page loads only show first tab-content-panel section
	$(".tab-content-panel section:not(:first)").hide();
	$(".tab-content-panel section:first").show();
	
	// also adjust width if no <aside> is present
	if ($('.tab-content-panel').find('aside').length == 0){
		$('.tab-content-panel section').css('width','auto');
	}
	
	
	$(".tabs-bar a").click(function(){
		stringref = $(this).attr("href").split('#')[1];
		$('.tab-content-panel section:not(.'+stringref+')').hide();
		
		if ($('#tabshover-' + stringref).hasClass('tabs-hover')) {
			
		} else {
			$("a").not('#tabshover-' + stringref).removeClass("tabs-hover");
			$('#tabshover-' + stringref).addClass("tabs-hover");
		}
			
		if ($.browser.msie && $.browser.version.substr(0,3) == "6.0") {
			$('.tab-content-panel section.' + stringref).show();
		}
		else 
			$('.tab-content-panel section.' + stringref).fadeIn();		
		return false;
	});
	
	$(".tab-icon-contact").mouseenter(function(){
		$('.tab-contact-bluepanel div.tab-icon-contact').css({background:'url("/bcms-resources/retail/images/icons-comms.gif") no-repeat -50px -45px transparent'});
	});	
	
	$('.tab-icon-contact').mouseleave(function(){
		$('.tab-contact-bluepanel div.tab-icon-contact').css({background:'url("/bcms-resources/retail/images/icons-comms.gif") no-repeat 0 0 transparent'});
	});
	
	
	
	// Check for link to tab in QueryString
	if (window.location.hash) {
		var hash = window.location.hash.substring(1);
		$('.tabs-bar a.'+hash).click();
	}
});