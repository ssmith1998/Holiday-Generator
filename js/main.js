$(document).ready(function() {
	// randomly generated location array
	var locationArr = [
		"Caribbean",
		"Poland",
		"Germany",
		"South Africa",
		"Portugal",
		"Spain"
	];

	var randomRes = locationArr[Math.floor(Math.random() * locationArr.length)];

	// console.log(randomRes);
	// randomly generated location array end

	$.ajax({
		type: "GET",
		headers: {
			"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
			"x-rapidapi-key": "ffab04686amsh3da0c0d6057b34ep1f81b3jsne6bbb0b4c85e"
		},
		url:
			"https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" +
			randomRes +
			"",
		beforeSend: function() {
			document.getElementById("randomBtn").innerHTML = "Loading...";
		},
		success: function(data) {
			document.getElementById("randomBtn").innerHTML = "Randomise again!";
			console.log(data);
			var name = data.data[0].result_object.name;
			var locImage = data.data[0].result_object.photo.images.original.url;
			var desc = data.data[0].result_object.geo_description;
			var latitudes = data.data[0].result_object.latitude;
			var longitudes = data.data[0].result_object.longitude;
			locationID = data.data[0].result_object.location_id;
			// console.log(locationID);
			// mapbox
			mapboxgl.accessToken =
				"pk.eyJ1Ijoic2VhbnNtaXRoOTgiLCJhIjoiY2thbDFoMTlpMHEzODJ3bXd6ZWMyNGxiZCJ9.W8BME0MhxkGYNFfIzJEuxA";
			var map = new mapboxgl.Map({
				container: "locationMap", // container id
				style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
				center: [longitudes, latitudes], // starting position [lng, latituded]
				zoom: 3 // starting zoom
			});
			var marker = new mapboxgl.Marker()
				.setLngLat([longitudes, latitudes])
				.addTo(map);
			// mapbox end

			// console.log(long);

			document.getElementById("randomLocation").innerHTML =
				"<h2 class='text-center'>" +
				name +
				"</h2>" +
				"<img class='w-100' src=" +
				locImage +
				">" +
				"<p class=' p-3'>" +
				desc +
				"</p>";
		}
	});
	var locationID;
	$(".randomBtn").on("click", function() {
		// randomly generated location array
		// var locationArr = [
		// 	"Netherlands",
		// 	"Poland",
		// 	"Germany",
		// 	"South Africa",
		// 	"Portugal",
		// 	"Spain"
		// ];

		var randomRes = locationArr[Math.floor(Math.random() * locationArr.length)];

		// console.log(randomRes);
		// randomly generated location array end
		$.ajax({
			type: "GET",
			headers: {
				"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
				"x-rapidapi-key": "ffab04686amsh3da0c0d6057b34ep1f81b3jsne6bbb0b4c85e"
			},
			url:
				"https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=GBP&units=km&query=" +
				randomRes +
				"",
			beforeSend: function() {
				document.getElementById("randomBtn").innerHTML = "Loading...";
			},
			success: function(data) {
				document.getElementById("randomBtn").innerHTML = "Randomise again!";
				console.log(data);
				var name = data.data[0].result_object.name;
				var locImage = data.data[0].result_object.photo.images.original.url;
				var desc = data.data[0].result_object.geo_description;
				var lat = data.data[0].result_object.latitude;
				var long = data.data[0].result_object.longitude;
				locationID = data.data[0].result_object.location_id;

				// mapbox
				mapboxgl.accessToken =
					"pk.eyJ1Ijoic2VhbnNtaXRoOTgiLCJhIjoiY2thbDFoMTlpMHEzODJ3bXd6ZWMyNGxiZCJ9.W8BME0MhxkGYNFfIzJEuxA";
				var map = new mapboxgl.Map({
					container: "locationMap", // container id
					style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
					center: [long, lat], // starting position [lng, lat]
					zoom: 3 // starting zoom
				});
				var marker = new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);
				// mapbox end

				console.log(long);

				document.getElementById("randomLocation").innerHTML =
					"<h2 class='text-center'>" +
					name +
					"</h2>" +
					"<img class='w-100' src=" +
					locImage +
					">" +
					"<p class=' p-3'>" +
					desc +
					"</p>";
			}
		});
	});

	$(".hotelPrices").on("click", function() {
		var longHotel;
		var latHotel;
		var btnSiblings = $(this).siblings();
		var price_select = btnSiblings[0].value;
		var date_select = btnSiblings[1].value;
		console.log(price_select);
		var hotelName;
		$.ajax({
			type: "GET",
			headers: {
				"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
				"x-rapidapi-key": "ffab04686amsh3da0c0d6057b34ep1f81b3jsne6bbb0b4c85e"
			},
			url:
				"https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&pricesmax=" +
				price_select +
				"&currency=GBP&limit=15&order=desc&lang=en_US&sort=recommended&location_id=" +
				locationID +
				"&adults=1&checkin=" +
				date_select +
				"&rooms=1&nights=2",
			beforeSend: function() {
				$("#hotelInfo")
					.empty()
					.html(
						"<button class='alert alert-primary' role='alert'>Getting you some great hotels</button>"
					);
			},
			success: function(data) {
				$("#hotelInfo").empty();

				function iterate(item) {
					console.log(item);
					let li = document.createElement("li");
					let btn = document.createElement("button");
					let btnLocation = document.createElement("button");
					let anchor = document.createElement("a");
					let btnWrapper = document.createElement("div");

					hotelName = item.name;
					btnLocation.textContent = "Map";
					li.textContent = item.name + "\u00A0" + "\u00A0" + item.price;
					btn.textContent = "More";
					li.setAttribute(
						"class",
						"list-group-item d-flex justify-content-between"
					);
					btnLocation.setAttribute("data-lat", item.latitude);
					btnLocation.setAttribute("data-long", item.longitude);
					btnLocation.setAttribute("data-name", item.name);
					btnLocation.setAttribute(
						"class",
						"btn btn-success w-100 mr-2 locationBtn"
					);
					btn.setAttribute("class", "btn btn-primary w-100");
					anchor.href = "hotelinfo.html?hotelID=" + item.location_id + "";
					btnWrapper.setAttribute("class", "d-flex flex-column flex-sm-row");

					document.getElementById("hotelInfo").appendChild(li);
					li.appendChild(btnWrapper);
					btnWrapper.appendChild(btnLocation);
					btnWrapper.appendChild(anchor);
					anchor.appendChild(btn);
					longHotel = item.longitude;
					latHotel = item.latitude;
					////////////////////mapbox////////////////////////
					// mapboxgl.accessToken =
					// 	"pk.eyJ1Ijoic2VhbnNtaXRoOTgiLCJhIjoiY2thbDFoMTlpMHEzODJ3bXd6ZWMyNGxiZCJ9.W8BME0MhxkGYNFfIzJEuxA";
					// var mapHotel = new mapboxgl.Map({
					// 	container: "hotelMap", // container id
					// 	style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
					// 	center: [longHotel, latHotel], // starting position [lng, lat]
					// 	zoom: 9 // starting zoom
					// });
					// var popup = new mapboxgl.Popup({ offset: 25 }).setText(hotelName);
					// var marker = new mapboxgl.Marker()
					// 	.setLngLat([longHotel, latHotel])
					// 	.addTo(mapHotel)
					// 	.setPopup(popup);

					////////////////////////// mapbox end//////////////////////
				}
				var loop = data.data.forEach(iterate);
			}
		});
	});
});
$("document").ready(function() {
	$(document).on("click", ".locationBtn", function() {
		$(".hotelMap").show();
		var btn = $(this)
			.parent()
			.parent()
			.siblings()
			.css({
				background: "#ffff",
				color: "black"
			});
		$(this)
			.parent()
			.parent()
			.css({
				background: "#28a745",
				color: "#ffff"
			});

		$("html,body").animate(
			{
				scrollTop: $("#hotelMap").offset().top
			},
			"slow"
		);
		var latitude = $(this).data("lat");
		var longitude = $(this).data("long");
		var nameHotel = $(this).data("name");
		// console.log(lat);
		// mapbox
		mapboxgl.accessToken =
			"pk.eyJ1Ijoic2VhbnNtaXRoOTgiLCJhIjoiY2thbDFoMTlpMHEzODJ3bXd6ZWMyNGxiZCJ9.W8BME0MhxkGYNFfIzJEuxA";
		var mapHotels = new mapboxgl.Map({
			container: "hotelMap", // container id
			style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
			center: [longitude, latitude], // starting position [lng, lat]
			zoom: 9 // starting zoom
		});
		var popup = new mapboxgl.Popup({ offset: 25 }).setText(nameHotel);
		var marker = new mapboxgl.Marker()
			.setLngLat([longitude, latitude])
			.addTo(mapHotels)
			.setPopup(popup);

		// // mapbox end
	});
});
