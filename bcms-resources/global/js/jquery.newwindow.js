$(window).load(function(){ 
	if ($("body").find("a.newwindow").length > 0){
		$("a.newwindow").each(function(){
			$(this).attr("target", "_blank");
		});
	}

	if ($("body").find("a.popup").length > 0){
		$("a.newwindow").each(function(){
			$(this).attr("target", "_blank");
		});
	}

	//using jquery.popupwindow.js
	$("a.popup").popupWindow({
			centerBrowser:1, width:900			 
		});
});