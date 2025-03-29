// Initialize the map object
let map = L.map("map", {
    center: [20, 0], // Centered globally
    zoom: 2          // Global view
  });
  
  // Add base maps
  let streetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Map data &copy; OpenStreetMap contributors"
  });
  
  let topoMap = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    attribution: "Map data &copy; OpenTopoMap contributors"
  });
  
  // Add the default base map (Street Map)
  streetMap.addTo(map);
  
  // Create a base map object for layer controls
  let baseMaps = {
    "Street Map": streetMap,
    "Topographic Map": topoMap
  };
  
  // Create a layer group for earthquakes
let earthquakes = new L.LayerGroup();

// Earthquake GeoJSON URL
let earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Fetch and add earthquake data
d3.json(earthquakeUrl).then(function (data) {
  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: function (feature) {
      return {
        radius: feature.properties.mag * 4, // Magnitude determines size
        fillColor: getColor(feature.geometry.coordinates[2]), // Depth determines color
        color: "#000",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.8
      };
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`
        <strong>Magnitude:</strong> ${feature.properties.mag}<br>
        <strong>Location:</strong> ${feature.properties.place}<br>
        <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km
      `);
    }
  }).addTo(earthquakes);
});

// Depth-based color function
function getColor(depth) {
  return depth > 90 ? "#ff0000" :
         depth > 70 ? "#ff6600" :
         depth > 50 ? "#ffcc00" :
         depth > 30 ? "#ccff00" :
         depth > 10 ? "#66ff00" :
                      "#00ff00";
}

// Create a legend control
let legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  let div = L.DomUtil.create("div", "info legend");

  // Depth ranges and corresponding colors
  let depths = [-10, 10, 30, 50, 70, 90];
  let colors = ["#00ff00", "#66ff00", "#ccff00", "#ffcc00", "#ff6600", "#ff0000"];

  // Add a legend title
  div.innerHTML = "<h4>Earthquake Depth (km)</h4>";

  // Loop through depths to generate labels with colored squares
  for (let i = 0; i < depths.length; i++) {
    div.innerHTML += `
      <i style="background: ${colors[i]};"></i> 
      ${depths[i]}${depths[i + 1] ? `–${depths[i + 1]}` : "+"} km<br>
    `;
  }

  // Add an explanatory note about marker size
  div.innerHTML += "<small><strong>Note:</strong> Marker size represents earthquake magnitude.</small>";

  return div;
};

// Add the legend to the map
legend.addTo(map);

// Create a layer group for tectonic plates
let tectonicPlates = new L.LayerGroup();

// Tectonic Plates GeoJSON URL
let platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Fetch and add tectonic plates data
d3.json(platesUrl).then(function (plateData) {
  L.geoJson(plateData, {
    style: function () {
      return {
        color: "#ff9933", // Orange color for plate boundaries
        weight: 2         // Width of the lines
      };
    }
  }).addTo(tectonicPlates);
});

// Create an overlay object
let overlayMaps = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicPlates
  };
  
  // Add layer controls to the map
  L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
  
earthquakes.addTo(map);
tectonicPlates.addTo(map);


