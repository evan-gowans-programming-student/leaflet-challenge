// Initialize the map object
let map = L.map("map", {
    center: [20, 0], // Centered near the equator
    zoom: 2          // Global view
  });
  
  // Add the basemap tile layer
  let basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Map data &copy; OpenStreetMap contributors"
  });
  basemap.addTo(map);  // Add the basemap to the map
  
  // Earthquake GeoJSON URL
let earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Fetch the GeoJSON data
d3.json(earthquakeUrl).then(function (data) {
  console.log(data);  // Log the data to ensure it's being fetched correctly
});

// Function to determine marker size based on magnitude
function getRadius(magnitude) {
    return magnitude === 0 ? 1 : magnitude * 4;  // Ensure non-zero size
  }
  
// Function to determine marker color based on depth
  function getColor(depth) {
    return depth > 90 ? "#ff0000" :  // Deep red for high depth
           depth > 70 ? "#ff6600" :
           depth > 50 ? "#ffcc00" :
           depth > 30 ? "#ccff00" :
           depth > 10 ? "#66ff00" :
                        "#00ff00";   // Bright green for shallow depth
  }
  
// Function to style each marker
  function styleInfo(feature) {
    return {
      radius: getRadius(feature.properties.mag),
      fillColor: getColor(feature.geometry.coordinates[2]),  // Depth determines color
      color: "#000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8
    };
  }

// Add earthquake data to the map
d3.json(earthquakeUrl).then(function (data) {
    L.geoJson(data, {
      // Turn each feature into a circleMarker
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
      },
      // Apply styles to each circleMarker
      style: styleInfo,
      // Add popups for each marker
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`
          <strong>Magnitude:</strong> ${feature.properties.mag}<br>
          <strong>Location:</strong> ${feature.properties.place}<br>
          <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km
        `);
      }
    }).addTo(map);
  });
  
// Create a legend control
let legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  let div = L.DomUtil.create("div", "info legend");
  
  // Depth ranges and their associated colors
  let depths = [-10, 10, 30, 50, 70, 90];
  let colors = ["#00ff00", "#66ff00", "#ccff00", "#ffcc00", "#ff6600", "#ff0000"];

  // Add a title to the legend
  div.innerHTML = "<h4>Earthquake Depth</h4>";

  // Add the color gradient and ranges to the legend
  for (let i = 0; i < depths.length; i++) {
    div.innerHTML += `
      <i style="background: ${colors[i]};"></i> 
      ${depths[i]}${depths[i + 1] ? `–${depths[i + 1]}` : "+"} km<br>
    `;
  }

  // Style the legend for better readability
  div.style.padding = "10px";
  div.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  div.style.borderRadius = "8px";
  div.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

  return div;
};

// Add the legend to the map
legend.addTo(map);


