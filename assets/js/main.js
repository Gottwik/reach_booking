require.config({
	baseUrl: 'assets/',

	paths: {
		// vendor
		'jquery': 'vendor/jquery/dist/jquery.min',
		'lodash': 'vendor/lodash/dist/lodash',

		// utilities
		'maps': 'js/utilities/google_maps_loader',
		'icon_generator': 'js/utilities/icon_generator',
		'gradientjs': 'js/utilities/gradientjs',
		'map_style': 'js/utilities/map_style',
		'overlay_handler': 'js/utilities/overlay_handler',

		// image generation
		'intensity_map_generator': 'js/image_generation/intensity_map_generator',
		'image_convertor': 'js/image_generation/image_convertor',
		'image_interpolator': 'js/image_generation/image_interpolator',
	},
})

require(['jquery', 'maps', 'lodash', 'icon_generator', 'map_style'], function ($, maps, _, icon_generator, map_style) {

	// load google maps api
	maps.done(function () {

		// render map with specified style
		var map = new google.maps.Map($('#map')[0], {
			zoom: 12,
			center: { lat: 52.36641789999999, lng: 4.897536700000046}, // first point
			styles: map_style,
			mapTypeControl: false,
		})

		if ($('.overlay').length) {
			require(['overlay_handler'], function (overlay_handler) {
				overlay_handler.overlay(map)
			})
		}

		if ($('.markers').length) {

			// load points
			$.get('/get_points', function (points) {
				draw_points(map, points)
			})
		}

		if ($('.precomputed').length) {
			require(['overlay_handler'], function (overlay_handler) {
				overlay_handler.overlay_precomputed(map)
			})
		}
	})

	// all_points will store all the points for later reference
	var all_points = []

	function draw_points (map, points) {

		all_points = []

		for (point_id in points) {

			// store current point
			current_point = points[point_id]

			// push the new marker into all_points store
			all_points.push(new google.maps.Marker({
				position: current_point,
				icon: icon_generator.generate_icon(current_point),
				map
			}))
		}
	}

})
