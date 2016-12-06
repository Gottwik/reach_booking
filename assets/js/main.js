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

	maps.done(function () {
		$.get('/_prebuilt/points.json', function (res) {

			var map = new google.maps.Map($('#map')[0], {
				zoom: 12,
				center: res[0],
				styles: map_style
			})

			draw_markers(map, res)
		})
	})

	var all_markers = []

	function draw_markers (map, points) {

		all_markers = []

		for (point_id in points) {
			current_point = points[point_id]

			all_markers.push(new google.maps.Marker({
				position: current_point,
				icon: icon_generator.generate_icon(current_point),
				map
			}))
		}
	}

})
