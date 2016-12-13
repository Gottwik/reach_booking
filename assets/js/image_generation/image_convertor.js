// * ———————————————————————————————————————————————————————— * //
// * 	icon generator
// *	generates icon for google marker based on travel time
// * ———————————————————————————————————————————————————————— * //

define(
	['gradientjs'],
	function (gradientjs) {

		var image_convertor = function () {}

		gradientjs.init([
			{
				key: 1300,
				value: '#2ECC71aa' // half an hour is perfectly fine
			},
			{
				key: 3600,
				value: '#3498DB99' // starts to get annoying at 1 hour
			},
			{
				key: 4500,
				value: '#e74c3c22' // 1:15 is not really acceptable
			},
			{
				key: 7200,
				value: '#bdc3c700' // 1:30 not really acceptable
			},
		])

		image_convertor.convert = function (image_data) {

			const c = create_canvas(image_data[0].length, image_data.length)
			const ctx = c.getContext('2d')

			for (y in image_data) {
				for (x in image_data[y]) {

					// if (x % 2 == 0 || y % 2 == 1) {
					// 	continue
					// }

					var duration = image_data[y][x]
					if (duration >= 0) {
						ctx.fillStyle = hex2rgba(gradientjs.get(duration))

						// draw image pixel by pixel
						ctx.fillRect(x, y, 1, 1)
					}
				}
			}
			console.log('DONE')
			return c.toDataURL()
		}

		function create_canvas (width, height) {
			var c = document.createElement('canvas')
			c.setAttribute('width', width)
			c.setAttribute('height', height)
			return c
		}

		function hex2rgba (hexa) {
			var r = parseInt(hexa.slice(1, 3), 16)
			g = parseInt(hexa.slice(3, 5), 16)
			b = parseInt(hexa.slice(5, 7), 16)
			a = parseInt(hexa.slice(7, 9), 16) / 255
			return 'rgba(' + r + ', ' + g + ' , ' + b + ', ' + a + ')'
		}

		return image_convertor
	}
)
