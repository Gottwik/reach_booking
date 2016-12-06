var point_generator = function () {}

point_generator.prototype.generate = function (settings) {
		settings = settings || {}
		// salzburg
		const lat = settings.lat || default_destination.lat
		const lng = settings.lng || default_destination.lng
		const center = {lat: lat, lng: lng}

		const point_limit = settings.point_limit || 25000
		const radius = settings.radius || .001
		const chord = settings.chord || .006

		// will store all the generated points
		var points = {}

		points[0] = {
			lat: center['lat'],
			lng: center['lng'],
		}

		var theta = chord / radius
		for (var point_id = 1 ; point_id <= point_limit; point_id++) {

		    // distance from center
		    var local_radius = radius * theta;

		    // angle
		    var local_angle = theta + 1;

		    // calculate coordinates and store it based on point_id
			points[point_id] = {
				lat: center['lat'] + Math.cos ( local_angle ) * local_radius / 1.5,
				lng: center['lng'] + Math.sin ( local_angle ) * local_radius,
			}

		    // increment theta
		    theta += chord / local_radius;
		}

		db.set('points', points).set('apicalls', []).value()

		return points
}

module.exports = new point_generator()
