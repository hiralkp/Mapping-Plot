// Create our initial map object
// Set the longitude, latitude, and the starting zoom level



function createMap(earthquakePins){
// Add a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var outdoormap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoor",
    accessToken: API_KEY
  });

var satellitemap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

var baseLayer =  {
	"satellite": satellitemap,
	"Light": lightmap,
	"Outdoor": outdoormap

}};


var map = L.map("map", {
  center: [38.00, -97.00],
  zoom: 5
});


var overlayLayer = {

	"Earthquake": earthquakePins,

};


L.control.layers(baseLayer, overlayLayer, {
	collapsed: false
}).addTo(map);

function createMarkers(response) {

  // Pull the "earthquakes" property off of response.data
  var earthquakes = response.features;

  // Initialize an array to hold earthquakes markers
  var earthquakesMarkers = [];

  // Loop through the earthquakes array
  for (var i = 0; i < earthquakes.length; i++) {
    var earthquake = earthquakes[i];

    // For each earthquake, create a marker and bind a popup with the earthquake's name
    var earthquakesMarker = L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
      fillOpacity: 0.75,
      color: "black",
      fillColor: chooseColor(earthquake.properties.mag),
      radius: earthquake.properties.mag * 20000,
      weight: .25
    })
      .bindPopup("<h3>Place: " + earthquake.properties.place + "</h3><h4>Magnitude: " + earthquake.properties.mag + "</h4><h4>Date & Time: " + Date(earthquake.properties.time)  + "</h4>");

    // Add the marker to the earthquakesMarkers array
    earthquakesMarkers.push(earthquakesMarker);
  }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(earthquakesMarkers));
  //createPolyLine();
}

// Perform an API call to the Citi Bike API to get earthquake information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);


// var myLink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// d3.json(myLink, function (createmap) {
// console.log(createmap);
// createFeatures(data.features);
// });

// function createFeatures(earthquakeData) {
// 	var earthquake = L.geoJson(earthquakeData, {
// 		onEachfeature: function(feature, layer){
// 			layer.bindPopup("<h3>" feature.properties.place + "<br> Magnitude: " + feature.properties.mag)
// 		}
// 	})
// }















//   // Create a new marker cluster group
//   var markers = L.markerClusterGroup();

//   // Loop through data
//   for (var i = 0; i < createmap.length; i++) {

//     // Set the data location property to a variable
//     var location = createmap[i].feature.geometry.coordinates;

//     // Check for location property
//     if (location) {

//       // Add a new marker to the cluster group and bind a pop-up
//       markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
//         .bindPopup(createmap[i].descriptor));
//     }

//   }

//   // Add our marker cluster layer to the map
//   map.addLayer(markers);

// });










// Create a new marker
// Pass in some initial options, and then add it to the map using the addTo method
// var marker = L.marker([45.52, -122.67], {
//   draggable: true,
//   title: "My First Marker"
// }).addTo(myMap);

// // Binding a pop-up to our marker
// marker.bindPopup("Hello There!");
