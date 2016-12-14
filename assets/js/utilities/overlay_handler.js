// * ———————————————————————————————————————————————————————— * //
// * 	icon generator
// *	generates icon for google marker based on travel time
// * ———————————————————————————————————————————————————————— * //

define(
	['intensity_map_generator'],
	function (intensity_map_generator) {

		var overlay_handler = function () {}

		overlay_handler.overlay = function (map) {
			intensity_map_generator.generate(function (image, image_bounds) {
				var intensity_map_overlay = new google.maps.GroundOverlay(image, image_bounds)
				intensity_map_overlay.setMap(map)

				$('.download_button').attr('href', image)
			})

		}

		const precomputed_image_bounds = {
			north: 52.746296,
			south: 51.9063115,
			east: 5.515759,
			west: 4.296155
		}

		overlay_handler.overlay_precomputed = function (map) {
			var intensity_map_overlay = new google.maps.GroundOverlay('assets/img/overlay.png', precomputed_image_bounds)
			intensity_map_overlay.setMap(map)

			var marker = new google.maps.Marker({
				position: {
					lat: 52.36641789999999,
					lng: 4.897536700000046
				},
				icon: {
					url: 'assets/img/bcommarker.svg',
					size: new google.maps.Size(32, 32),
					scaledSize: new google.maps.Size(32, 32),
					anchor: new google.maps.Point(16, 0),
					origin: new google.maps.Point(0, 0),
				},
				map
			})
		}

		return overlay_handler
	}
)
