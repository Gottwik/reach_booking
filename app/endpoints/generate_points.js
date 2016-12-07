// * ———————————————————————————————————————————————————————— * //
// * 	/generate_points endpoint
// * ———————————————————————————————————————————————————————— * //
var get_points = function () {}

// local dependencies
var point_generator = require(CMD_FOLDER + '/app/libs/point_generator')

get_points.prototype.init = function (app) {
	app.get('/generate_points', function (req, res) {
		point_generator.generate()
		res.send('generated')
	})

}

module.exports = new get_points()
