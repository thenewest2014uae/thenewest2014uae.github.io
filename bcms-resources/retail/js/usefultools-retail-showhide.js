$(document).ready(function () {
if ($.browser.msie && $.browser.version.substr(0,3) == "6.0") {
	$(".usefultools-icon-contact").mouseenter(function(){
		$(this).css({background:'url("/bcms-resources/retail/images/icons-comms.gif") no-repeat -50px -45px transparent'});
	});	
	
	$('.usefultools-icon-contact').mouseleave(function(){
		$(this).css({background:'url("/bcms-resources/retail/images/icons-comms.gif") no-repeat 0 0 transparent'});
	});
	
	$(".usefultools-icon-locate").mouseenter(function(){
		$(this).css({background:'url("/bcms-resources/retail/images/icons-comms.gif") no-repeat -150px -135px transparent'});
	});	
	
	$('.usefultools-icon-locate').mouseleave(function(){
		$(this).css({background:'url("/bcms-resources/retail/images/icons-comms.gif") no-repeat -100px -90px transparent'});
	});
	
	$(".usefultools-icon-calculate").mouseenter(function(){
		$(this).css({background:'url("/bcms-resources/retail/images/icons-comms.gif") no-repeat -350px -315px transparent'});
	});	
	
	$('.usefultools-icon-calculate').mouseleave(function(){
		$(this).css({background:'url("/bcms-resources/retail/images/icons-comms.gif") no-repeat -300px -270px transparent'});
	});
	
	$(".usefultools-icon-ask").mouseenter(function(){
		$(this).css({background:'url("/bcms-resources/retail/images/icons-comms.gif") no-repeat -450px -405px transparent'});
	});	
	
	$('.usefultools-icon-ask').mouseleave(function(){
		$(this).css({background:'url("/bcms-resources/retail/images/icons-comms.gif") no-repeat -400px -360px transparent'});
	});
}
});