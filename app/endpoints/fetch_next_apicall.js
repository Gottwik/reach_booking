// * ———————————————————————————————————————————————————————— * //
// * 	/fetch_next_apicall endpoint
// * ———————————————————————————————————————————————————————— * //
var fetch_next_apicall = function () {}

// local dependencies
var travel_time_getter = require(CMD_FOLDER + '/app/libs/travel_time_getter')

fetch_next_apicall.prototype.init = function (app) {
	app.get('/fetch_next_apicall', function (req, res) {
		travel_time_getter.fetch_next_apicall()
			.then((status) => {
				res.send({success: true, message: status})
			}, (status) => {
				res.send({success: false, message: status})
			})
	})
}

module.exports = new fetch_next_apicall()
