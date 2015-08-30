;(function () {
    var pageEls = {
        search: null,
        address: null,
        addressLabel: null,
        type: null,
        typeLabel: null
    };
    var map, geocoder, arrayOfNearLocations = [],
        arrayOfLocations = [],
        radius = 25;
        
    var Locator = {
        InitFields: function () {
            pageEls.search = $('#btn_search'),
            pageEls.address = $('#addressInput').val(),
            pageEls.addressLabel = $('#addressLabel'),
            pageEls.type = $("input[name='types']:checked").val(),
            pageEls.typeLabel = $('#type')
        },
        ValidateFields: function () {
            var eflag = false;
            var alpnum = /^[-0-9a-zA-Z\s]+$/
            
            if ($.trim(pageEls.address).length === 0 || alpnum.test(pageEls.address) == false) {
                pageEls.addressLabel.addClass('empty');
                eflag = true;
            } else pageEls.addressLabel.removeClass('empty');

            if (pageEls.type === undefined) {
                pageEls.typeLabel.addClass('empty');
                eflag = true;
            } else pageEls.typeLabel.removeClass('empty');

            if (eflag) return false;
            else return true;
        },
        LoadMap: function () {
            var mapOptions = {
                zoom: 7,
                center: new google.maps.LatLng(24.5, 54),
                mapTypeControl: true,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            map = new google.maps.Map(document.getElementById("map"), mapOptions);

        },
        SearchLocations: function () {
            pageEls.search.on('click', function () {
                Locator.InitFields();
                arrayOfNearLocations = [];
                $('#sidebar, #map').children().remove();

                if (Locator.ValidateFields()) {
                    pageEls.search.val('Loading...');
                    pageEls.search.attr('disabled', true);

                    geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        'address': pageEls.address
                    }, function (results, status) {
                        if (status === 'ZERO_RESULTS') {
                            $('#error').show();
                            $('#locatorContainer').hide();
                            $('#error').html('<br />Location is not found in the name of "' + pageEls.address + '"');
                            //alert(pageEls.address + 'Address not found');
                        } else {
                            $('#error').hide();
                            $('#locatorContainer').show();
                            LatLng = results[0].geometry.location;
                            Locator.LoadMap();
                            Locator.SearchLocationsNear(LatLng);
                        }
                        pageEls.search.val('Search');
                        pageEls.search.attr('disabled', false);
                    });
                }
            });
        },
        SearchLocationsNear: function (center) {

            lat = center.lat();
            lng = center.lng();
            type = pageEls.type;

            var dataArray = [],
                neighborhoods = [],
                markers = [],
                iterator = 0,
                image = '../bcms-resources/retail/images/eagle.png',
                latlngbounds = new google.maps.LatLngBounds(),
                infowindow = new google.maps.InfoWindow(),
                $html;

            for (key in jsonObject) {
                dataArray.push(key);// Push the key on the array
                dataArray.push(jsonObject[key]);// Push the key's value on the array
            }
            arrayOfLocations = dataArray[1];

            function is_array(input) {
                return (typeof (input) == 'object' || (input instanceof Array));
            }

            function SortByDistance(a, b) {
                var aDistance = a.distance,
                    bDistance = b.distance;
                return ((aDistance > bDistance) ? -1 : ((aDistance < bDistance) ? 1 : 0));
            }


            for (var curItem = 0; curItem < arrayOfLocations.length; curItem++) {
                if (type === 'atm-cdm') {
                    if (arrayOfLocations[curItem]['type'] != 'CDM' && arrayOfLocations[curItem]['type'] != 'ATM' && arrayOfLocations[curItem]['type'] != 'ATM and CDM') continue;
                } else if (type === 'branch') {
                    if (arrayOfLocations[curItem]['type'] != 'Branch' && arrayOfLocations[curItem]['type'] != 'Service Centre') continue;
                }
                var distance = Locator.Distance(lat, lng, arrayOfLocations[curItem]['lat'], arrayOfLocations[curItem]['lng'], 'M');
                if (distance < radius) {
                    distance = Math.round(distance * 100) / 100;
                    arrayOfLocations[curItem]['distance'] = distance;
                    arrayOfNearLocations.push(arrayOfLocations[curItem])
                }
            }

            function createMarker(latlng, name, address, ali, phone, fax, bushours, facilities, markerId) {
                
				var html = '<div class="markerTextBox" id=' + markerId + '><b>' + name + '</b><br/>' + address; // + '</b><br/>' + fax + '</b><br/>' + phone;
				if (ali != '' || phone != '' || fax != ''){
					html+= "<br/><br/><b>Additional Location Information:</b>";		
				}
				if(ali != ''){
					html+='<br/>'+ali;
				}
				if (phone != '' && phone != undefined) {
					html +='<br/>'+ phone;
                }
                if (fax != '' && fax != undefined) {
                    html +='<br/>' + fax;
                }
				
				bushours = (bushours == '') ? '' : "<br/><br/><b>Business Hours:</b><br/>" + bushours;
				facilities = (facilities == '') ? '' : "<br/><br/><b>Facilities:</b><br/>" + facilities;

				if (bushours != '' || bushours != bushours) {
                    html = html + '<br/>' + bushours;
                }
				
				if (facilities != '' || facilities != facilities) {
                    html = html + '<br/>' + facilities;
                }
                
                html+='</div>';

                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: image
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent(html);
                    infowindow.open(map, marker);
                });
                markers.push(marker);
                return marker;
            }
            
            $('#sidebar').append('<div class="resultHeader"><div id="rhAddress">Address</div><div id="rhDistance">Distance</div></div>');

            function createSideBar(name, address, type, distance, i) {
                $('.resultHeader').after('<div class="result"><div class="rName"><b>' + name + '</b> (' + type + ')</div><div class="rDistance">' + parseFloat(distance).toFixed(2) + ' miles</div><div class="rAddress">' + address + '</div><div class="clearFloat">&nbsp;</div></div>');
            }

            if (arrayOfNearLocations.length === 0) {
                var noResultsStr = '<div id="noresult">No results found.</div>';
                $('#sidebar').html(noResultsStr);
            } else {

                arrayOfNearLocations.sort(SortByDistance);

                for (var i in arrayOfNearLocations) {
                    neighborhoods.push(new google.maps.LatLng(arrayOfNearLocations[i]['lat'], arrayOfNearLocations[i]['lng']));
                    latlngbounds.extend(neighborhoods[i]);

                    var name = arrayOfNearLocations[i]['name'],
                        address = arrayOfNearLocations[i]['address'],
                        ali = arrayOfNearLocations[i]['ali'],
                        phone = arrayOfNearLocations[i]['phone'],
                        fax = arrayOfNearLocations[i]['fax'],
                        bushours = arrayOfNearLocations[i]['bushours'],
                        facilities = arrayOfNearLocations[i]['facilities'],
                        type = arrayOfNearLocations[i]['type'],
                        distance = arrayOfNearLocations[i]['distance'],
                        latlng = neighborhoods[i];

                    var marker = createMarker(latlng, name, address, ali, phone, fax, bushours, facilities, i);
                    createSideBar(name, address, type, distance, i);
                }

                map.fitBounds(latlngbounds);
                google.maps.event.addListener(map, 'click', function () {
                    infowindow.close();
                });

                $('.result').click(function (e) {
                    var index = $('.result').index(this);
                    var len = $('.result').length;
                    index = len - index - 1;

                    if (index > -1) {
                        google.maps.event.trigger(markers[index], "click");
                    } else {
                        infowindow.close();
                    }
                });
            }
        },

        Distance: function (lat1, lon1, lat2, lon2, unit) {

            function deg2rad(deg) {return (Math.PI / 180) * deg;}
            function rad2deg(rad) {return (rad * 180) / Math.PI;}
            theta = lon1 - lon2;
            dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
            dist = Math.acos(dist);
            dist = rad2deg(dist);
            miles = dist * 60 * 1.1515;
            unit = unit.toUpperCase();

            if (unit == "K") {
                return (miles * 1.609344);
            } else if (unit == "N") {
                return (miles * 0.8684);
            } else {
                return miles;
            }
        },

        Start: function () {
            $(document).ready(function () {
                Locator.InitFields();
                Locator.SearchLocations();
                $('#formcontent').submit(function (evt) {
                    evt.preventDefault();
                });
            });
        }
    };
    window.Locator = Locator;
    Locator.Start();
}());