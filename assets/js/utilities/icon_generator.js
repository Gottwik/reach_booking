// * ———————————————————————————————————————————————————————— * //
// * 	icon generator
// *	generates icon for google marker based on travel time
// * ———————————————————————————————————————————————————————— * //

define(
	['gradientjs'],
	function (gradientjs) {

		var icon_generator = function () {}

		gradientjs.init([
			{
				key: 0,
				value: '#27ae60'
			},
			{
				key: 3600,
				value: '#3498db'
			},
			{
				key: 7200,
				value: '#c0392b'
			},
		])

		icon_generator.generate_icon = function (point) {

			// default icon
			var icon = {
				url: get_svg_circle(),
				anchor: new google.maps.Point(5, 5),
				opacity: .5,
				scale: 1,
			}

			// return if the point has no travel time
			if (!point.travel_time || point.travel_time.status !== 'OK') {
				return icon
			}

			// apply style based on travel time
			icon.url = get_svg_circle(point.travel_time.duration.value)

			return icon
		}

		function get_svg_circle (duration) {

			// if travel time is less than one hour
			if (duration < 3600) {
				return 'data:image/svg+xml;utf-8, \
					<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"> \
						<circle opacity="0.7" fill="' + gradientjs.get(duration) + '" cx="10" cy="10" r="10"/> \
						<text text-anchor="middle" x="10" y="14" fill="#FFFFFF" font-family="monospace" font-size="11">' + Math.floor(duration / 60) + '</text> \
					</svg>'
			}

			// point without travel time
			if (!duration) {
				return 'data:image/svg+xml;utf-8, \
					<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"> \
						<circle fill="#999999" cx="1" cy="1" r="1" opacity="0.3" /> \
					</svg>'
			}

			// travel time more than 1 hour
			var size = 3 * 3600 / duration
			return 'data:image/svg+xml;utf-8, \
					<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"> \
						<circle opacity="0.9" fill="' + gradientjs.get(duration) + '" cx="' + size + '" cy="' + size + '" r="' + size + '"/> \
					</svg>'

		}

		return icon_generator
	}
)
