var get_points = function () {}

// local dependencies

get_points.prototype.init = function (app) {
	app.get('/get_points', function (req, res) {
		res.send(db.get('points').value())
	})

}

module.exports = new get_points()
