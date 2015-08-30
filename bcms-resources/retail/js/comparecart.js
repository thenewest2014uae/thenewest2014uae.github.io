$(document).ready(function(){
	var prd=null,prdid=null,prdidSplit=null,type=null,cid=null,
		cmpProductID=null,cmpProductType=null,currCookieValue=null,
		obj=null,i=null;
		
	var cmpprd=$("#itemcart").find("li");
	//var cmpprd=[li#CreditCard, li#Loan]
	
	checkCmpCookie();
	$(".tab-heading span").css("display", "block");;
	$(".tabdetail-heading span").css("display", "block");

	if(!Array.indexOf){
	  Array.prototype.indexOf = function(obj){
	   for(i=0; i<this.length; i++){
		if(this[i]==obj){
		 return i;
		}
	   }
	   return -1;
	  }
	}
	
	//checked add to compare
	$("input:checkbox[name=cmpproduct]").change(function(){  
		prd = $(this);
		prdid = prd.attr("id");
		prdidSplit = prdid.split("-");
		type = prdidSplit[0];
		cid = prdidSplit[1];
		
		if (prd.attr('checked')) {
			addToCmpCookie(cid,type); //add to cookie and cart 
		} else {
			removeFromCmpCookie(cid,type); //remove from cookie and cart 
		}
	});	
	
	//Check click on Remove all items btn
	$("#itemcart").find("img").click(function(){
		prd = $(this);
		prdtype = prd.attr("id");
		prdtypeSplit = prdtype.split("-");
		type = prdtypeSplit[0];
		removeAllPFromCmpCookie(type);
	});
	
	function addToCmpCookie(cid,type){
		cmpProductID = cid;
		cmpProductType = type;
		currCookieValue=getCmpCookie("productCmp");
		if (currCookieValue!=null && currCookieValue!="") {
			obj = JSON.parse(currCookieValue); 
			for (key in obj) {
				//console.log(cmpProductType);
				if (key == cmpProductType){
					if (obj[key].indexOf(cmpProductID) == -1){
						obj[key].push(cmpProductID);
					} 
				}
            } 
		} else {
			obj = {};
			for (i=0;i<cmpprd.length;i++){
				prdid = cmpprd[i].id;
				prdtypeSplit = prdid.split("-");
				type = prdtypeSplit[0];
				obj[type] = [];
			}
			obj[cmpProductType] = [cmpProductID];
		}
		updateCmpCookie(obj);
		updateCartCmpQuantity(obj);
	} 
	
	function removeFromCmpCookie(cid,type){
		cmpProductID = cid;
		cmpProductType = type;
		currCookieValue=getCmpCookie("productCmp");
		if (currCookieValue!=null && currCookieValue!="") {
			obj = JSON.parse(currCookieValue);
			for (key in obj) {
				if (key == cmpProductType){
					var currItem = obj[cmpProductType].indexOf(cmpProductID);
					if (currItem != -1){
						obj[cmpProductType].splice(currItem,1);
					}		
				} else {
					//console.log("error removeFromCmpCookie");
				}
            }
			updateCmpCookie(obj);
			updateCartCmpQuantity(obj);
		} else {
			//console.log("error removeFromCmpCookie null");
		}
	}
	
	function updateCartCmpQuantity(obj) {
		//check cookie and update cart with quantity
		if (obj!=null && obj!="") {
			for (key in obj) {
				var cmpitem = $("#itemcart li#"+key+"").find("#"+key+"-prdnum");
				var cmpitembtnrm = $("#itemcart li#"+key+"").find("#"+key+"-prdrm");
				cmpitem.text("("+obj[key].length+")");
				if (obj[key].length > "0"){
					cmpitem.css("display","inline");
					cmpitembtnrm.css("display","inline");
				} else {
					cmpitem.css("display","none");
					cmpitembtnrm.css("display","none");
				}
			}
		}		
	} 
	
	function removeAllPFromCmpCookie(type){
		//update cart zero
		//console.log("remove: "+type);
		cmpProductType = type;
		currCookieValue=getCmpCookie("productCmp");
		if (currCookieValue!=null && currCookieValue!="") {
			obj = JSON.parse(currCookieValue);
			for (key in obj) {
				if (key == cmpProductType){
					for (i=0;i<obj[key].length;i++){
						$("#"+key+"-"+obj[key][i]).attr("checked", false);
					}
					obj[cmpProductType] = [];	
				} else {
					//console.log("error removeAllProductFromCmpCookie");
				}
            }
			updateCmpCookie(obj);
			updateCartCmpQuantity(obj);
		} else {
			//console.log("error removeAllAllProductFromCmpCookie null");
		}
	}
	
	function updateCheckboxes(){
		//check cookie and update checkboxes selected
		$("section").find("input:checkbox[name=cmpproduct]").removeAttr("checked");
		
		currCookieValue=getCmpCookie("productCmp");
		if (currCookieValue!=null && currCookieValue!="") {
			obj = JSON.parse(currCookieValue);
			for (key in obj) {
				for (i=0;i<obj[key].length;i++){
					$("#"+key+"-"+obj[key][i]).attr("checked", true);
				}
			}
		} else {
			//console.log("error updateCheckboxes");
		}	
	}
	
	function updateCmpCookie(obj){
		var newCookieValue = JSON.stringify(obj);
		//console.log(newCookieValue);
		setCmpCookie("productCmp", newCookieValue, null);
	}
	
	function getCmpCookie(c_name){
		var x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++){
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name){
				return unescape(y);
			}
		}
	}

	function setCmpCookie(c_name,value,exdays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value + ";PATH=/";
	}

	function checkCmpCookie(){
		currCookieValue=getCmpCookie("productCmp");	
		var productItems= "";
		
		if (currCookieValue!=null && currCookieValue!="") {
			obj = JSON.parse(currCookieValue);
			updateCheckboxes(); //update checkboxes
			updateCartCmpQuantity(obj); //update cart
			//console.log('cookie exists');
		} else {
			setCmpCookie("productCmp", productItems, null);
			updateCartCmpQuantity(obj); //update cart zero
			//console.log('set cookie');
		}
	}	
});