$(document).ready(function() {
	//////////////////// slick init//////////////////
	$(".offersSlider").slick({
		infinite: true,
		slidesToShow: 2
	});
	/////////////////////slick end////////////////////////////
	// retrieve hotel info page
	function getUrlParameter(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
		var results = regex.exec(location.search);
		return results === null
			? ""
			: decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	// var foo = getParameterByName('foo');
	var hotelID = getUrlParameter("hotelID");
	console.log(hotelID);
	// retrieve hotel info page end
	$.ajax({
		type: "GET",
		headers: {
			"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
			"x-rapidapi-key": "ffab04686amsh3da0c0d6057b34ep1f81b3jsne6bbb0b4c85e"
		},
		url:
			"https://tripadvisor1.p.rapidapi.com/hotels/get-details?adults=1&nights=2&currency=USD&lang=en_US&child_rm_ages=7%252C10&checkin=2020-08-15&location_id=" +
			hotelID +
			"",
		success: function(data) {
			console.log(data);
			var hotelName = data.data[0].name;
			var hotelAddress = data.data[0].address;
			var hotelImg = data.data[0].photo.images.original.url;
			var hotelDesc = data.data[0].description;
			var hotelEmail = data.data[0].email;
			var hotelPhone = data.data[0].phone;
			var hotelLong = data.data[0].longitude;
			var hotelLat = data.data[0].latitude;
			var hotelURL = data.data[0].web_url;
			console.log(hotelName + hotelAddress);
			document.getElementById("hotelName").innerHTML = hotelName;
			$(".hotelImg").attr("src", hotelImg);
			var tripAdvisorBtn = document.getElementById("tripAdvisorBtn");
			tripAdvisorBtn.href = hotelURL;
			$(".hotelDesc").html(hotelDesc);
			$(".hotelTitle").html(hotelName + "|" + hotelAddress);
			$(".hotelContact").html(
				"Phone:" + hotelPhone + "|" + "Email:" + hotelEmail
			);

			///////////////////////////// loop over ammenities/////////////////////
			function iterate(item) {
				let div = document.createElement("div");
				let p = document.createElement("p");
				div.textContent = item.name;
				div.setAttribute(
					"class",
					"col-sm-4 d-flex justify-content-center card"
				);
				div.setAttribute("id", " item");
				// console.log(item.name);
				document.getElementById("hotelAmmenities").appendChild(div);
			}

			var loop = data.data[0].amenities.forEach(iterate);
			///////////////////////////// loop over ammenities end/////////////////////

			///////////////////////////// loop over offers/////////////////////

			function iterateItem(item) {
				var provider_name = item.provider_display_name;
				var provider_link = item.link;
				console.log(item.provider_display_name);
				let slide = document.createElement("p");
				slide.textContent = provider_name;
				////////////////////////// Use slick 'slickAdd' method to add content using JS///////////////////////

				$(".offersSlider").slick(
					"slickAdd",
					"<div class='d-flex flex-column justify-content-center align-items-center'>" +
						provider_name +
						"<a href=" +
						provider_link +
						">" +
						"<button class='btn btn-success'> Book with " +
						provider_name +
						"</button>" +
						"</a>" +
						"</div>"
				);
				////////////////////////// Use slick 'slickAdd' method to add content using JS end///////////////////////
			}

			var loop = data.data[0].hac_offers.offers.forEach(iterateItem);

			///////////////////////////// loop over offers end/////////////////////

			//////////////////////////////mapbox////////////////////////
			mapboxgl.accessToken =
				"pk.eyJ1Ijoic2VhbnNtaXRoOTgiLCJhIjoiY2thbDFoMTlpMHEzODJ3bXd6ZWMyNGxiZCJ9.W8BME0MhxkGYNFfIzJEuxA";
			var map = new mapboxgl.Map({
				container: "hotelSingleLocation", // container id
				style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
				center: [hotelLong, hotelLat], // starting position [lng, lat]
				zoom: 3 // starting zoom
			});
			var marker = new mapboxgl.Marker()
				.setLngLat([hotelLong, hotelLat])
				.addTo(map);
			// mapbox end
		}
	});
});
