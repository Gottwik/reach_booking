// * ———————————————————————————————————————————————————————— * //
// * 	/make_static endpoint
// * ———————————————————————————————————————————————————————— * //
var get_points = function () {}

// local dependencies
var static_handler = require(CMD_FOLDER + '/app/libs/static_handler')

get_points.prototype.init = function (app) {
	app.get('/make_static', function (req, res) {
		static_handler.statictify()
			.then(() => {
				res.send({success: true, message: 'statictified successfully'})
			})
	})
}

module.exports = new get_points()
