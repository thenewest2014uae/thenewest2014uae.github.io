$(document).ready(function(){	
	
	$("#tabs a:not(.iframe)").click(function(){
		var reqClassName = $(this).parent().attr('class');
		if(reqClassName == "tabs-bar"){
		stringref = $(this).attr("id");
		
		if ($('#' + stringref).hasClass('tabs-hover')) {
			
		} else {
			$("nav.tabs-bar").children("a").removeClass("tabs-hover");
			$(this).addClass("tabs-hover");
		
			if ($(".tabsection section").children('div.'+stringref).length > 0){
				$('.tabsection section').children('div').css("display","none");
				if (($.browser.msie)){
					$('.tabsection section div.'+stringref).show();
				}
				else 
					$('.tabsection section div.'+stringref).fadeIn();
			}
		}
		return false;
		}
	});
	
	$(".tab-icon-contact").mouseenter(function(){
		$('.tab-contact-bluepanel div.tab-icon-contact').css({background:'url("images/icons-comms.gif") no-repeat -50px -45px transparent'});
	});	
	
	$('.tab-icon-contact').mouseleave(function(){
		$('.tab-contact-bluepanel div.tab-icon-contact').css({background:'url("images/icons-comms.gif") no-repeat 0 0 transparent'});
	});

	// Check for link to tab in QueryString
	if (window.location.hash) {
		var hash = window.location.hash.substring(1);
		var tab = hash.split("tab-");
		$('.tabs-bar a#'+tab[1]).click();
	}
	
});