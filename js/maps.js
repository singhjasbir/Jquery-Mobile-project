$(document).ready (function (){
	//alert("Yipeeeeeeeee");
	
	var n = 1;
		var Caddr = new Array();
		$(document).ready(function () {
			var cAddr, clat, clng;
			geocoder = new google.maps.Geocoder();
			if (navigator.geolocation) {
				var info = new google.maps.InfoWindow({
					content: "Where am I?",
					maxWidth: 150		
					});
			} else {
				alert("Geolocation is not supported by this browser.");
			}

		$.ajax({
		  type: "GET",
		  url: "json/customers.json",
			  dataType: "json",
			  error: ajaxerror,
			  success: parseJSON 
			});
	  
		function ajaxerror() {
			alert("The JSON File could not be processed correctly.");
		}

		function parseJSON(data) {
			for (var i = 0; i < data.company.customer.length; i++) {
				$("#ulout").append("<li data-id='" + i + "'>" + 
					"<b>" +data.company.customer[i].compName + "</b>" +",  " +data.company.customer[i].compAddr + "</li>");
				Caddr[i] = data.company.customer[i].compAddr;
				$("#ulout").listview("refresh");
			}
			  DisplayAddr();
		}

		function DisplayAddr() {
			$("#ulout li").click(function() {
				var x = $(this).attr("data-id");
				alert("See Map Below.");
				getCoord(Caddr[x]);
				}); 
		}

	//  This code goes between here
	function getCoord(cAddr)  {
		var address = cAddr;
		
		//This is where I ma getting the longitude and lattitude
		geocoder.geocode( {'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var myLatLang = results[0].geometry.location;
			clat = results[0].geometry.location.lat();
			clng = results[0].geometry.location.lng();		
				drawMap();
		  }
			
			});
	}

	function drawMap(){
		var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var geocoder = new google.maps.Geocoder();
		var lat = clat;
		var lng = clng;
		var latlng = new google.maps.LatLng(lat,lng);
		geocoder.geocode({"latLng":latlng}, function(data,status)  {
					if (status == google.maps.GeocoderStatus.OK)  {
				
						var mapOptions = {
							center: latlng,
							zoom:20,
							//ROADMAP, HYBRID, SATELLITE, TERRAIN
							mapTypeId: google.maps.MapTypeId.SATELLITE
							};
					
						//Here I ma creating the object of the map class.
						var map = new google.maps.Map($("#map-canvas")[0], mapOptions);
					
						//Here I ma defining the marker so that I can pin point the location.
						    marker = new google.maps.Marker ({
							map: map,
							animation: google.maps.Animation.BOUNCE,
							position: latlng
							});
				
					   //This is the action listener that will display the addressin marker upon click.
						google.maps.event.addListener(marker, "click", function() { 
							var latlng = new google.maps.LatLng(this.position.lat(),this.position.lng());
							geocoder.geocode({"latLng":latlng}, function(data,status)  {
								if (status === google.maps.GeocoderStatus.OK)
									info.setContent(data[0].formatted_address);
								});
							info.open(map, this);
							});
					}
				});
		
	}				
	});
		
	
});