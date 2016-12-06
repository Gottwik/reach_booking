define(
	['jquery'],
	function($) {

		var gradient = function () {}

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

		gradient.init = function (gradient_definition) {
			this.gradient_definition = gradient_definition
		}

		gradient.get = function (value) {
			var self = this

			var just_below = 0
			var just_after = self.gradient_definition.length - 1

			while (just_below < self.gradient_definition.length && self.gradient_definition[just_below].key > value) {
				just_below++
			}
			just_below = Math.max(0, just_below - 1)

			while (just_after >= 0 && self.gradient_definition[just_after].key > value) {
				just_after--
			}
			just_after = Math.min(self.gradient_definition.length - 1, just_after + 1)


			var color_below = self.gradient_definition[just_below].value
			var color_after = self.gradient_definition[just_after].value

			var ratio = 100 - 100 * (value - self.gradient_definition[just_below].key) / (self.gradient_definition[just_after].key - self.gradient_definition[just_below].key)

			return mix(color_below, color_after, ratio)
		}

		// based on jedfoster's gist: https://gist.github.com/jedfoster/7939513
		function mix(color_1, color_2, weight) {

			// gets rid of # if it's in front of the color
			color_1 = color_1.replace('#', '')
			color_2 = color_2.replace('#', '')

			function d2h(d) { return d.toString(16); }  // convert a decimal value to hex
			function h2d(h) { return parseInt(h, 16); } // convert a hex value to decimal

			weight = (typeof(weight) !== 'undefined') ? weight : 50; // set the weight to 50%, if that argument is omitted

			var color = "#";

			for(var i = 0; i <= 5; i += 2) { // loop through each of the 3 hex pairs—red, green, and blue
				var v1 = h2d(color_1.substr(i, 2)), // extract the current pairs
					v2 = h2d(color_2.substr(i, 2)),

					// combine the current pairs from each source color, according to the specified weight
					val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));


				while(val.length < 2) { val = '0' + val; } // prepend a '0' if val results in a single digit

				color += val; // concatenate val to our new color string
			}

			return color; // PROFIT!
		}

		return gradient
	}
)
