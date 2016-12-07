require.config({
	baseUrl: '/assets/',

	paths: {
		'jquery': 'vendor/jquery/dist/jquery.min',
		'maps': 'js/utilities/google_maps_loader',
		'lodash': 'vendor/lodash/dist/lodash',
		'icon_generator': 'js/utilities/icon_generator',
		'gradientjs': 'js/utilities/gradientjs',
		'map_style': 'js/utilities/map_style',
	},
})

require(['jquery', 'maps', 'lodash', 'icon_generator', 'map_style'], function ($, maps, _, icon_generator, map_style) {

	// load google maps api
	maps.done(function () {

		// load points
		$.get('/_prebuilt/points.json', function (points) {

			// render map with specified style
			var map = new google.maps.Map($('#map')[0], {
				zoom: 12,
				center: points[0], // first point
				styles: map_style
			})

			draw_points(map, points)
		})
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
