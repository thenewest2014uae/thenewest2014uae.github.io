//hide all of the element with class promo-content
$('.promo-toggle').removeClass('promo-explore');
$(".panel-promocontent").hide();
$(".panel-promoheading-white").hide();
//promo-toggle the component with class promo-explore
$(".promo-toggle").click(function(){
	var parentPromoPanel = $(this).parents('div.promo-panel');
	if ($(this).hasClass('promo-explore')) {
		$(this).removeClass('promo-explore');
		parentPromoPanel.find('.panel-promoheading-white').hide();
		parentPromoPanel.find('.panel-heading-white').show();
		parentPromoPanel.find('.panel-promocontent').hide();
	} else {
    	$(this).addClass('promo-explore');
		parentPromoPanel.find('.panel-heading-white').hide();
        parentPromoPanel.find('.panel-promoheading-white').show();
		parentPromoPanel.find('.panel-promocontent').show();
   	}
  	return false;
});