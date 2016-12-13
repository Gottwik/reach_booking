# reach_booking

Travel time to Rembrandtplein, Amsterdam visualized on a map.

![Imgur](http://i.imgur.com/TkCvqru.png)

![](http://i.imgur.com/eVj7qe7.png)

# How to rebuild to another destination
Change the default destination in `/app/app.js`: to your coordinates

```
global.default_destination = {lat: 52.36641789999999, lng: 4.897536700000046}
```

start the (www.endurojs.com)[enduro] and access `localhost:5000/generate_points` then `localhost:5000/generate_apicalls`. Now you have the points and api urls prebuilt and you can start calling `localhost:5000/fetch_next_apicall` to get travel times.

## Overlay
Using markers is simple, but the performance suffers when there are too many of them. Alternative idea is to use overlay image:

![Imgur](http://i.imgur.com/Eubk4HC.png)

## Future ideas
* Switch travel mode between public transport, bicycle and driving
* Have a nice gui to the getting of the travel times.

