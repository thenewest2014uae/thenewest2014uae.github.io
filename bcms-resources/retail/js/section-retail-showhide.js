// Add to List menu from h2 tags in section.
var sectionCount = 1;
var HTMLtoBeInserted = "";

$(".tab-content-panel section").each(function(){
	$(this).addClass("section-" + sectionCount);
	var menuText = $(this).find('h2').first().text();
	var className = menuText.replace(" ","");
	$(this).find('h2').first().hide();
	HTMLtoBeInserted = HTMLtoBeInserted + '<nav class="tabs-bar"><a href="#section-' + sectionCount + '" id="tabshover-section-' + sectionCount + '" class="tab-' + className + '">' +  menuText + '</a></nav>'
	sectionCount = sectionCount + 1;
});

$("div#tabs div.tabs").html(HTMLtoBeInserted); 
$("div#tabs div.tabs").children("nav").first().children("a").first().addClass('tabs-hover');