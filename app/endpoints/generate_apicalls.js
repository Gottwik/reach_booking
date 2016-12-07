// * ———————————————————————————————————————————————————————— * //
// * 	/generate_apicalls endpoint
// * ———————————————————————————————————————————————————————— * //
var generate_apicalls = function () {}

// local dependencies
var travel_time_getter = require(CMD_FOLDER + '/app/libs/travel_time_getter')

generate_apicalls.prototype.init = function (app) {
	app.get('/generate_apicalls', function (req, res) {
		res.send(travel_time_getter.get_apicalls())
	})

}

module.exports = new generate_apicalls()
