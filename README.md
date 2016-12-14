# reach_booking

Travel time to Rembrandtplein, Amsterdam visualized on a map.

![Imgur](http://i.imgur.com/sDjIXRq.png)

# How it works

## Generation of points around given center coordinates
Points are generated in a spiral with increasing radius but with equivalent distances between consecutive points ([credit: Pete Kirkham](http://stackoverflow.com/a/13901170/4742670)). To generate points, use `/generate_points` endpoint.

![Imgur](http://i.imgur.com/dkuXPPg.png)

## Getting distances from center
This project uses [Google distance matrix api](https://developers.google.com/maps/documentation/distance-matrix/). This allows for 100 requests, 25 points each per day for free. The map in the demo was generated from 25,000 points, so I had to run the `/fetch` endpoint on 10 days ;-). 1000 points are ok for simple uses.

Check out the distance visualization here: https://gottwik.github.io/reach_booking/markers

![Imgur](http://i.imgur.com/TkCvqru.png)

![Imgur](http://i.imgur.com/eVj7qe7.png)

## Generate overlay image
Rendering 25,000 markers is slow so I opted for an approach where I generate a single png and overlay it on map. This is done via mapping points to coordinates on the bitmap and then interpolating the pixels in between.

![Imgur](http://i.imgur.com/Eubk4HC.png)

# How to rebuild to another destination
Change the default destination in `/app/app.js`: to your coordinates

```
global.default_destination = {lat: 52.36641789999999, lng: 4.897536700000046}
```

start the (www.endurojs.com)[enduro] and access `localhost:5000/generate_points` then `localhost:5000/generate_apicalls`. Now you have the points and api urls prebuilt and you can start calling `localhost:5000/fetch_next_apicall` to get travel times.


## Future ideas
* Switch travel mode between public transport, bicycle and driving
* Have a nice gui to the getting of the travel times.

