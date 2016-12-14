// * ———————————————————————————————————————————————————————— * //
// * 	gradientjs
// *	return color in gradient based on value
// * ———————————————————————————————————————————————————————— * //

define(
	['jquery'],
	function ($) {

		var gradient = function () {}

		// default definition
		gradient.gradient_definition = [
			{
				key: 0,
				value: '#ff0000'
			},
			{
				key: 100,
				value: '#00ff00'
			},
		]

		// * ———————————————————————————————————————————————————————— * //
		// * 	init
		// *	@param {array} gradient_definition - array of sorted key/value definitions specifing the gradient
		// *	@return nothing
		// * ———————————————————————————————————————————————————————— * //
		gradient.init = function (gradient_definition) {
			this.gradient_definition = gradient_definition || this.gradient_definition
		}

		// * ———————————————————————————————————————————————————————— * //
		// * 	gets color
		// *	@param {int} value - value to get
		// *	@return {hex color}
		// * ———————————————————————————————————————————————————————— * //
		gradient.get = function (value) {
			var self = this

			// just_below and just_after are indices of the color above and below the specified value
			var just_below = 0
			var just_after = self.gradient_definition.length - 1

			// calculates just_below by going up while provided value is less then gradient point's value
			while (just_below < self.gradient_definition.length && self.gradient_definition[just_below].key < value) {
				just_below++
			}
			just_below = Math.max(0, just_below - 1)

			// calculates just_after by going down while provided value is more then gradient point's value
			while (just_after >= 0 && self.gradient_definition[just_after].key > value) {
				just_after--
			}
			just_after = Math.min(self.gradient_definition.length - 1, just_after + 1)

			// stores above and below colors
			var color_below = self.gradient_definition[just_below].value
			var color_after = self.gradient_definition[just_after].value

			// calculates ratio which is used to mix the two colors
			var ratio = 100 - 100 * (value - self.gradient_definition[just_below].key) / (self.gradient_definition[just_after].key - self.gradient_definition[just_below].key)

			// return mixed color
			return mix(color_below, color_after, ratio)
		}

		// * ———————————————————————————————————————————————————————— * //
		// * 	gets color
		// * 	based on jedfoster's gist: https://gist.github.com/jedfoster/7939513
		// *	@param {hex color} color_1
		// *	@param {hex color} color_2
		// *	@param {int} weight - percentage notation from 0 to 100
		// *	@return {hex color} - resulting mixed color
		// * ———————————————————————————————————————————————————————— * //
		function mix (color_1, color_2, weight) {

			// gets rid of # if it's in front of the color
			color_1 = color_1.replace('#', '')
			color_2 = color_2.replace('#', '')

			// support for hex with alpha
			var length = Math.min(color_1.length, color_2.length) > 6 ? 7 : 5

			function d2h (d) { return d.toString(16) }  // convert a decimal value to hex
			function h2d (h) { return parseInt(h, 16) } // convert a hex value to decimal

			weight = (typeof weight !== 'undefined') ? weight : 50 // set the weight to 50%, if that argument is omitted

			// start the output color with #
			var color = '#'

			for (var i = 0; i <= length; i += 2) { // loop through each of the 3 hex pairs—red, green, and blue
				var v1 = h2d(color_1.substr(i, 2)) // extract the current pairs
				var	v2 = h2d(color_2.substr(i, 2))

				// combine the current pairs from each source color, according to the specified weight
				var	val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)))

				while (val.length < 2) { val = '0' + val } // prepend a '0' if val results in a single digit

				color += val // concatenate val to our new color string
			}

			return color
		}

		return gradient
	}
)
