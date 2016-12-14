// * ———————————————————————————————————————————————————————— * //
// * 	icon generator
// *	generates icon for google marker based on travel time
// * ———————————————————————————————————————————————————————— * //

define(
	['image_convertor', 'image_interpolator'],
	function (image_convertor, image_interpolator) {

		var image_map_generator = function () {}

		const image_bounds = {
			north: 52.746296,
			south: 51.9063115,
			east: 5.515759,
			west: 4.296155
		}

		var image_bound_width = image_bounds.east - image_bounds.west
		var image_bound_height = image_bounds.north - image_bounds.south

		const image_size = {
			width: 1000,
			height: 1000
		}

		image_map_generator.generate = function (export_canvas) {

			var image_data = Array(image_size.height).fill(0).map(function () { return Array(image_size.width).fill(-1) })

			$.get('/get_points', function (points) {

				for (point_id in points) {
					var point = points[point_id]

					if (point.travel_time && point.travel_time.status === 'OK') {
						var duration = point.travel_time.duration.value

						var point_x = Math.round((point.lng - image_bounds.west) / image_bound_width * image_size.width)
						var point_y = image_size.height - Math.round((point.lat - image_bounds.south) / image_bound_height * image_size.height)

						point.x = point_x
						point.y = point_y

						if (point_y > 0 && point_y < image_size.height && point_x > 0 && point_x < image_size.width) {
							image_data[point_y][point_x] = duration
						}
					}

				}

				// fills the non-queried pixels
				image_data = image_interpolator.interpolate(image_data, points)

				export_canvas(image_convertor.convert(image_data), image_bounds)
			})
		}

		return image_map_generator
	}
)
