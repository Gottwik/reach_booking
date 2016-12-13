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

		return overlay_handler
	}
)
