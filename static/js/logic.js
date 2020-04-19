let myMap = L.map("map", {
  center: [
    45, -100.5
  ],
  zoom: 5
});





let earthMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1IjoiYmFzc2FtYXppeiIsImEiOiJjazgxdXF2ajUwYWpzM2lwY3pqdjRhd2V2In0.TBGRoZar2IM-lYCWJ8tdxQ"
}).addTo(myMap);






 earthURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

 
 
d3.json(earthURL, function(data){
  console.log(data)
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  function getColor(magnitude) {
    switch (true) {
    case magnitude > 5:
      return "#ea2c2c";
    case magnitude > 4:
      return "#ea822c";
    case magnitude > 3:
      return "#ee9c00";
    case magnitude > 2:
      return "#eecc00";
    case magnitude > 1:
      return "#d4ee00";
    default:
      return "#98ee00";
    }
  }

  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }

    return magnitude * 4;
  }



 
 L.geoJson(data, { 
   
    
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    
    style: styleInfo,
    
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }


  }).addTo(myMap);
 


 })



  
  function onEachFeature(feature, layer) {
    console.log(feature.geometry.coordinates[0])
    console.log(feature.geometry.coordinates[1])
    
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }


  
  




 
  