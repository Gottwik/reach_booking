var local_app = function () {}

var glob = require('glob')
var path = require('path')
var low = require('lowdb')

// global.db = low(path.join(CMD_FOLDER, 'app', 'db', 'db.json'))
global.db = low(path.join(CMD_FOLDER, 'app', 'db', 'db_highres.json'))

global.default_destination = {lat: 52.36641789999999, lng: 4.897536700000046}

local_app.prototype.init = function (app) {
	glob.sync(path.join(CMD_FOLDER, 'app', 'endpoints', '**', '*.js')).forEach(function (file) {
		require(path.resolve(file)).init(app)
	})
}

module.exports = new local_app()
