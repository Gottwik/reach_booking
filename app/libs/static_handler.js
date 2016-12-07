// * ———————————————————————————————————————————————————————— * //
// * 	static handler
// *	prebuilts points.json file to enable static hosting on github
// * ———————————————————————————————————————————————————————— * //
var static_handler = function () {}

// vendor dependencies
var fs = require('fs')
var path = require('path')
var Promise = require('bluebird')

static_handler.prototype.statictify = function () {
	return new Promise(function (resolve, reject) {
		var points = db.get('points').value()
		fs.writeFile(path.join(CMD_FOLDER, '_src', '_prebuilt', 'points.json'), JSON.stringify(points), function () {
			resolve()
		})
	})
}

module.exports = new static_handler()
