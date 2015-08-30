//Move copyright into explore-links
$('footer div.copyright').prependTo('footer div.explore-links');

//hide all of the element with class explore-content
$('#explore-toggle').removeClass('explore');
$(".explore-content").hide();

//explore-toggle the component with class explore
$("#explore-toggle").click(function(){
	if ($(this).hasClass('explore')) {
		$(this).removeClass('explore');
		$('.explore-content').hide(600);
	} else {
    		$(this).addClass('explore');
        	$('.explore-content').show(600);
   	}
  	return false;
});