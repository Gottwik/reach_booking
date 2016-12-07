// * ———————————————————————————————————————————————————————— * //
// * 	travel time getter
// *	handles fetching travel times from google
// * ———————————————————————————————————————————————————————— * //
var travel_time_getter = function () {}

// vendor dependencies
var Promise = require('bluebird')
var _ = require('lodash')
var request = require('request')

const api_chunk_limit = 25

// * ———————————————————————————————————————————————————————— * //
// * 	get_apicalls
// *	generates api urls that are meant to be requested later
// *	stores them in low json
// * ———————————————————————————————————————————————————————— * //
travel_time_getter.prototype.get_apicalls = function () {
	var self = this

	var points = db.get('points').value()

	var apicalls = _.chain(self.get_points_without_traveltime(points))
		.toPairs()
		.chunk(api_chunk_limit)
		.map(_.fromPairs)
		.value()
		.map(get_request_url)

	db.set('apicalls', apicalls).value()

	return apicalls
}

// * ———————————————————————————————————————————————————————— * //
// * 	fetch_next_apicall
// *	gets one api call and store the result with the point
// *	stores them in low json
// * ———————————————————————————————————————————————————————— * //
travel_time_getter.prototype.fetch_next_apicall = function () {
	return new Promise(function (resolve, reject) {

		var apicalls = db.get('apicalls').value()
		var points = db.get('points').value()

		if (!apicalls.length) {
			reject('no more urls to fetch')
		}

		var apicall = apicalls[0]

		request(apicall.url, function (error, response, body) {
			if (error || response.statusCode !== 200) {
				return reject('error getting travel times')
			}
			var travel_times = JSON.parse(body)

			if (travel_times.status !== 'OK') {
				return reject('error with status #{travel_times.status}')
			}

			for (i in apicall.ids) {
				var point_id = apicall.ids[i]
				var point = points[point_id]

				// point['address'] = travel_times.origin_addresses[i] // bloated the json
				point['travel_time'] = travel_times.rows[i].elements[0]
			}

			db.set('points', points).value()
			db.set('apicalls', apicalls.slice(1)).value()
			resolve(apicall)
		})

	})
}

// * ———————————————————————————————————————————————————————— * //
// * 	get_points_without_traveltime
// *	filters out points with travel time
// *	@param {object} points
// *	@return {object} points
// * ———————————————————————————————————————————————————————— * //
travel_time_getter.prototype.get_points_without_traveltime = function (points) {

	return _.chain(points)
		.toPairs()
		.filter((point) => {
			if (point[1].travel_time) {
				return false
			}
			return true
		})
		.fromPairs()
		.value()
}

// * ———————————————————————————————————————————————————————— * //
// * 	get_request_url
// *	builds the google api url based on starting points
// *	@param {object} origins
// *	@return {object} point ids and api call url
// * ———————————————————————————————————————————————————————— * //
function get_request_url (origins) {
	var origin_string = _.chain(origins).map(stringify_coordinate).join('|')
	var destination_string = stringify_coordinate(default_destination)
	return {
		ids: _.chain(origins).toPairs().map((point) => { return point[0] }).value(),
		url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origin_string + '&destinations=' + destination_string + '&key=AIzaSyDqxv0Xmastxseo__bsWUI9kd8k28ZLEV4&mode=transit'
	}
}

// * ———————————————————————————————————————————————————————— * //
// * 	stringify_coordinate
// *	@param {object} point
// *	@return {string} lattitude and longitude in google accepted format
// * ———————————————————————————————————————————————————————— * //
function stringify_coordinate (point) {
	return point.lat + ',' + point.lng
}

module.exports = new travel_time_getter()
