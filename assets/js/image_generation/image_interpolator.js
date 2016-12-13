// * ———————————————————————————————————————————————————————— * //
// * 	image interpolator
// *	interpolates travel time for non-queried pixels
// * ———————————————————————————————————————————————————————— * //

define(
	['lodash'],
	function (_) {

		var image_interpolator = function () {}

		var image_width
		var point_count
		var close_threshold
		var points_sorted_by_x

		image_interpolator.interpolate = function (image_data, points) {

			points = _.filter(points, function (point) { return point && 'x' in point })

			image_width = image_data[0].length
			close_threshold = image_width / 100

			// store the center
			var center = points[0]

			// sort points by x coordinate to speed up nearest neighbor search
			points_sorted_by_x = _.chain(points).sortBy(function (point) {
				return point.x
			})
			.values()
			.value()

			point_count = points_sorted_by_x.length

			var max_distance_to_center = get_max_distance_to_center(points)

			var total_iterations = image_data.length * image_data[0].length
			var iteration_log_step = total_iterations / 100
			var iteration = 0
			var timer = _.now()
			var time_diff = 0
			for (y in image_data) {
				for (x in image_data[y]) {
					iteration++

					// prints status
					if (iteration % iteration_log_step == 0) {
						time_diff = (time_diff + (_.now() - timer) / 1000) / 2 // in seconds
						timer = _.now()

						var estimated_time = (total_iterations - iteration) / iteration_log_step * time_diff
						console.log(Math.round(100 * iteration / total_iterations) + '% - estimate finish in : ', Math.floor(estimated_time / 60), 'minutes', Math.floor(estimated_time % 60), 'seconds')
					}

					// if (iteration > 4500) {
					// 	return image_data
					// }

					// // get rid of the points outside the requested circle
					var distance_to_center = get_pixel_distance(center, x, y)
					if (distance_to_center > max_distance_to_center) {
						continue
					}

					// only interpolate points without duration
					if (image_data[y][x] < 0) {

						var four_nearest_points = get_four_nearest_points(points, x, y)

						four_nearest_points.filter(function (point) {
							return x in point
						})

						if (four_nearest_points.length == 0) {
							image_data[y][x] = -1
							continue
						}

						var total_distance = 0

						var values = []
						for (point_id in four_nearest_points) {
							var point = four_nearest_points[point_id]
							var distance = get_pixel_distance(point, x, y)

							if (!point.x) {
								image_data[y][x] = -1
								continue
							}

							var value = -1
							if (point.travel_time && point.travel_time.status === 'OK') {
								value = point.travel_time.duration.value
							}

							values.push([distance, value])
							total_distance += distance
						}

						if (total_distance > image_width / 25) {
							continue
						}

						var resulting_value = 0

						// if (Math.min(...values.map(function (v) { return v[0] })) < 10) {

							// console.log('total_distance', total_distance)
							for (value_id in values) {
								value = values[value_id]

								// console.log('distance:', value[0], 'value:', value[1], 'ratio:', ((value[0]) / total_distance), 'inverse:', ((total_distance - value[0]) / (total_distance)) - .5)
								resulting_value += Math.max(0, value[1] * (((total_distance - value[0]) / (total_distance)) - .5))
							}
							// console.log('result', resulting_value)
							// console.log('')
						// }

						image_data[y][x] = resulting_value
					}
				}
			}

			return image_data
		}

		function get_four_nearest_points (points, x, y) {
			return _.chain(get_close_points(x, y)).sortBy(function (point) {
			// return _.chain(points).sortBy(function (point) {
				return get_pixel_distance(point, x, y)
			})
			.value()
			.slice(0, 4)

		}

		function get_close_points (x, y) {
			var left = 0
			var right = points_sorted_by_x.length
			var index = Math.floor((left + right) / 2)
			// console.log(left, right)
			while (Math.abs(points_sorted_by_x[index].x - x) > close_threshold && left < right && index < points_sorted_by_x.length) {
				if (x > points_sorted_by_x[index].x) {
					left = index + 1
				} else {
					right = index - 1
				}

				index = Math.floor((left + right) / 2)

				if (index >= points_sorted_by_x.length) {
					break
				}
			}

			return points_sorted_by_x
				.slice(Math.max(0, index - image_width), Math.min(point_count, index + image_width))
				.filter(function (point) {
					return Math.abs(point.y - y) < close_threshold
				})
		}

		function get_pixel_distance (point, x, y) {
			return Math.sqrt(Math.pow(Math.abs(point.x - x), 2) + Math.pow(Math.abs(point.y - y), 2))
		}

		function get_pixel_distance_between_two_points (point_a, point_b) {
			return get_pixel_distance(point_a, point_b.x, point_b.y)
		}

		function get_max_distance_to_center (points) {
			var center = points[0]

			var max_distance = 0

			for (point_id in points) {
				var point = points[point_id]
				if (point.travel_time && point.travel_time.status === 'OK') {
					max_distance = Math.max(max_distance, get_pixel_distance_between_two_points(point, center))
				}
			}

			return max_distance
		}

		return image_interpolator
	}
)
