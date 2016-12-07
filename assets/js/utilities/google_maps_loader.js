var google_maps_loaded_def = null

define(['jquery'], function ($) {

	if (!google_maps_loaded_def) {

		google_maps_loaded_def = $.Deferred()

		window.google_maps_loaded = function () {
			google_maps_loaded_def.resolve(google.maps)
		}

		require(['https://maps.googleapis.com/maps/api/js?key=AIzaSyDqxv0Xmastxseo__bsWUI9kd8k28ZLEV4&callback=google_maps_loaded&libraries=places,visualization'], function () {}, function (err) {
			google_maps_loaded_def.reject()
			throw err
		})
	}

	return google_maps_loaded_def.promise()

})
