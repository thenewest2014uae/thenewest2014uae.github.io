$(document).ready(function () {
    var CardUtil = {
        Local: {
            items: null,
            featureList: [],
            currItemsLength: null
        },
        Init: function () {
            CardUtil.InitFeatures();
            CardUtil.InitFields();
        },
        BeforeStart: function () {
            var myData = jsonObject,
                dataArray, key;
            var currCookieValue = getCmpCookie("productCmp");
            var cmpProductType = $("input[name=comparison-type]").val();
            //console.log(cmpProductType)
            if (currCookieValue != null && currCookieValue != "") {
                obj = JSON.parse(currCookieValue);
                //console.log("cookie data");
                for (key in obj) {
                    if (key == cmpProductType) {
                        var currItems = obj[cmpProductType];
                        //console.log(currItems);
                        currItemsLength = currItems.length;
                        for (var i = 0; i < currItemsLength; i++) {
                            for (var j = 0; j < myData['products'].length; j++) {
                                if (myData['products'][j]['assetId'] == currItems[i]) {
                                    swap(i, j);
                                }
                            }
                        }
                    } else {
                        //console.log("error comparsion cookie");
                    }
                }
            } else {
                currItemsLength = 0;
            }

            function getCmpCookie(c_name) {
                var x, y, ARRcookies = document.cookie.split(";");
                for (i = 0; i < ARRcookies.length; i++) {
                    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                    x = x.replace(/^\s+|\s+$/g, "");
                    if (x == c_name) {
                        return unescape(y);
                    }
                }
            }
			
            function swap(i, j) {
                //console.log(i +' and ' +j);
                var temp = myData['products'][i];
                myData['products'][i] = myData['products'][j];
                myData['products'][j] = temp;
            }
            dataArray = [];
            for (key in myData) {
                dataArray.push(key); // Push the key on the array
                dataArray.push(myData[key]); // Push the key's value on the array
            }
            for (key in dataArray[3]) {
                //console.log(key);
                CardUtil.Local.featureList.push(key);
            }
            CardUtil.Local.items = dataArray[1];
        },
        InitFeatures: function () {
            $('tr.data-row  td:first-child').each(function (index) {
                var isButton = (CardUtil.Local.featureList[index].match('Button')) ? true : false;
                if (isButton) $(this).text('');
                else $(this).html(CardUtil.Local.featureList[index]);
            });
        },
        InitFields: function () {
            var updateOptions = function () {
                $('tr#columns td+td').each(function (index) {
                    $(this).find('select').remove();
                    /* Create select element with options available in items array */
                    var ind = index + 1,
                        strSelect = '<select class="fixselect" id="card' + ind + '"><option>Add Product</option>';
                    for (var curItem = 0; curItem < CardUtil.Local.items.length; curItem++) {
                        if (CardUtil.Local.items[curItem]['show'] === '0') {
                            strSelect += ('<option value =' + CardUtil.Local.items[curItem]['id'] + ' >' + CardUtil.Local.items[curItem]['name'] + '</option>');
                        }
                    }
                    $(this).prepend(strSelect);
                });
                //fix ie select width
                if ($.browser.msie && $.browser.version < 9) {
                    var el;
                    $("select.fixselect").each(function () {
                        el = $(this);
                        el.data("origWidth", el.outerWidth())
                    })
                        .mouseenter(function () {
                        $(this).css("width", "auto");
                    })
                        .bind("blur change", function () {
                        el = $(this);
                        el.css("width", el.data("origWidth"));
                    });
                }
            }
            var defaultOptionsHidden = function () {
                $('td select').hide();
            }
            var populateData = function (index, cardSelected) {
                var dataRowLength = $('tr.data-row').length;

                function getkey(i) {
                    return CardUtil.Local.featureList[i];
                }
                for (var i = 0, key; i <= dataRowLength; i++) {
                    key = getkey(i);
                    if (cardSelected === undefined) {
                        $('tr.data-row').eq(i).find('td').eq(index).next().html(CardUtil.Local.items[index][key]);
                    } else {
                        $('tr.data-row').eq(i).find('td').eq(index).html(CardUtil.Local.items[cardSelected][key]);
                    }
                }
            }
            var nProducts = CardUtil.Local.items.length;
            var cardID = null,
                isProdImage = null;
            //console.log(currItemsLength);
            function showProduct(that, index) {
                cardID = CardUtil.Local.items[index]['id'];
                isProdImage = CardUtil.Local.items[index]['icon'];
                //Check for product Icons exist in Json object
                (CardUtil.Local.items[index]['icon']) ? $(that).find('span').append(CardUtil.Local.items[index]['icon'], CardUtil.Local.items[index]['name']).parent().attr('class', cardID) : $(that).find('span').append(CardUtil.Local.items[index]['name']).parents('td').attr('class', cardID);
                CardUtil.Local.items[index]['show'] = '1';
                populateData(index);
            }
            if ((currItemsLength == 3 || currItemsLength == 0 || currItemsLength >= 4) && nProducts > 4) {
                $('tr#columns td + td div').each(function (index) {
                    if (CardUtil.Local.items[index] !== undefined) {
                        if (index === 3 && nProducts > 4) {
                            //$(this).children().show();
                        } else {
                            showProduct(this, index);
                        }
                        updateOptions();
                        defaultOptionsHidden();
                        if (nProducts > 4) {
                            $('#card4').show().siblings().hide();
                        }
                    }
                });
            } else if ((currItemsLength == 0 || currItemsLength == 4) && nProducts <= 4) {
                $('tr#columns td + td div').each(function (index) {
                    if (CardUtil.Local.items[index] !== undefined) {
                        showProduct(this, index);
                        updateOptions();
                        defaultOptionsHidden();
                    }
                });
            } else if (currItemsLength == 3 && nProducts <= 4) {
                $('tr#columns td + td div').each(function (index) {
                    if (CardUtil.Local.items[index] !== undefined) {
                        if (index === 3) {
                            //$(this).children().show();
                        } else {
                            showProduct(this, index);
                        }
                        updateOptions();
                        defaultOptionsHidden();
                        $('#card4').show().siblings().hide();
                    }
                });
            } else if ( (currItemsLength == 2 && nProducts <= 4) || (currItemsLength == 2 && nProducts > 4) ){
                $('tr#columns td + td div').each(function (index) {
                    if (CardUtil.Local.items[index] !== undefined) {
                        if (index === 2 || index === 3) {
                            //$(this).children().show();
                        } else {
                            showProduct(this, index);
                        }
                        updateOptions();
                        defaultOptionsHidden();
                        $('#card3').show().siblings().hide();
                        $('#card4').show().siblings().hide();
                    }
                });
            } else if ((currItemsLength == 1 && nProducts <= 4) || (currItemsLength == 1 && nProducts > 4)) {
                $('tr#columns td + td div').each(function (index) {
                    if (CardUtil.Local.items[index] !== undefined) {
                        if (index === 1 || index === 2 || index === 3) {
                            //$(this).children().show();
                        } else {
                            showProduct(this, index);
                        }
                        updateOptions();
                        defaultOptionsHidden();
                        $('#card2').show().siblings().hide();
                        $('#card3').show().siblings().hide();
                        $('#card4').show().siblings().hide();
                    }
                });
            }
            if (nProducts == 1) {
                $('tr.data-row').each(function () {
                    $(this).children().eq(1).nextAll().remove();
                    $(this).children().not(':first').css('width', '45%');
                });
                $('tr#columns').children().eq(1).css('margin-left', '15%').nextAll().remove();
            } else if (nProducts == 2) {
                $('tr.data-row').each(function () {
                    $(this).children().eq(2).nextAll().remove();
                    $(this).children().not(':first').css('width', '35%');
                });
                $('tr#columns').children().eq(2).css('width', '35%').nextAll().remove();
                $('tr#columns').children().first().css('width', '29%');
            } else if (nProducts == 3) {
                $('tr.data-row').each(function () {
                    $(this).children().eq(3).nextAll().remove();
                    $(this).children().not(':first').css('width', '25%');
                });
                $('tr#columns').children().css('width', '25%').eq(3).nextAll().remove();
                $('tr#columns').children().first().css('width', '25%');
            }
            if (nProducts <= 4) {
                $('.removeItem').hide();
            }
            var switchEls = function () {
                $('td select').each(function () {
                    if ($(this).siblings().is(':hidden')) {} else {
                        $(this).hide();
                    }
                });
            }
            $('.removeItem').click(function () {
                $(this).parent().hide().siblings().toggle();
                var className = $(this).parents('td').attr('class');
                var colID = $(this).parents('td');
                for (var curItem = 0; curItem < CardUtil.Local.items.length; curItem++) {
                    if (CardUtil.Local.items[curItem]['id'] === className) {
                        CardUtil.Local.items[curItem]['show'] = '0';
                        $(this).siblings('span').text('');
                        $(this).parents('td').removeClass();
                    }
                }
                col = $(colID).index();
                $(this).parents('tr').siblings().filter('.data-row').find('td:nth-child(' + col + ')').next().text('');
                updateOptions();
                switchEls();
            });
            $('td > select').live("change", function () {
                var className = $(this).attr('value'),
                    colID = $(this).parents('td'),
                    optionSelected = $(this).attr('value'),
                    col = $(colID).index(),
                    cardIndex;
                $(this).parents('td').attr('class', className);
                for (var curItem = 0; curItem < CardUtil.Local.items.length; curItem++) {
                    if (CardUtil.Local.items[curItem]['id'] === optionSelected) {
                        cardIndex = curItem;
                        CardUtil.Local.items[curItem]['show'] = '1';
                        //Check for product Icons exist in Json object
                        (CardUtil.Local.items[curItem]['icon']) ? $(this).siblings().find('span').append(CardUtil.Local.items[curItem]['icon'], CardUtil.Local.items[curItem]['name']) : $(this).siblings().find('span').append(CardUtil.Local.items[curItem]['name']);
                    }
                }
                populateData(col, cardIndex);
                updateOptions();
                $('#' + $(this).attr('id')).hide().siblings().show();
                switchEls();
            });
        },
        start: function () {
            CardUtil.BeforeStart();
            $(document).ready(function () {
                CardUtil.Init();
            });
        }
    };
    window.CardUtil = CardUtil;
    CardUtil.start();
});