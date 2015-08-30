//hide all of the element with class aside-content
$('#aside-toggle').removeClass('aside-explore');
$('#aside-toggle2').removeClass('aside-explore2');
$('#aside-toggle3').removeClass('aside-explore3');
$(".aside-content").hide();
$(".aside-content2").hide();
$(".aside-content3").hide();
//aside-toggle the component with class aside-explore
$("#aside-toggle").click(function(){
	if ($(this).hasClass('aside-explore')) {
		$(this).removeClass('aside-explore');
		$('.aside-content').hide(600);
	} else {
    		$(this).addClass('aside-explore');
        	$('.aside-content').show(600);
   	}

   	var newString = ($(':contains("more")',this).length > 0 ? '<span>Show fewer links</span>' : '<span>Show more links</span>');
	$(this).empty().append(newString);
  	return false;
});

$("#aside-toggle2").click(function(){
	if ($(this).hasClass('aside-explore2')) {
		$(this).removeClass('aside-explore2');
		$('.aside-content2').hide(600);
	} else {
    	$(this).addClass('aside-explore2');
        $('.aside-content2').show(600);
   	}
  	return false;
});

$("#aside-toggle3").click(function(){
	if ($(this).hasClass('aside-explore3')) {
		$(this).removeClass('aside-explore3');
		$('.aside-content3').hide(600);
	} else {
    	$(this).addClass('aside-explore3');
        $('.aside-content3').show(600);
   	}
  	return false;
});