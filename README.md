# Leaflet Earthquake and Tectonic Plates Visualization

## Overview
This project uses **Leaflet** and **D3.js** to create a dynamic, interactive map for visualizing earthquake data and tectonic plate boundaries. The goal is to illustrate the relationship between seismic activity and tectonic plates, while providing an engaging user experience with multiple base maps, layer controls, styled markers, and a polished legend.

---

# Repository Structure

## Leaflet-Part-1/
- `index.html` - HTML file for the Part 1 map
- `style.css` - CSS file for Part 1
- `logic.js` - JavaScript logic for Part 1

## Leaflet-Part-2/
- `index.html` - HTML file for the Part 2 map
- `style.css` - CSS file for Part 2
- `logic.js` - JavaScript logic for Part 2

---

## Part 1: Earthquake Visualization
### Purpose
The objective of Part 1 is to plot earthquake data (from the last 7 days) on a map and dynamically style the markers to reflect both the **magnitude** (size) and **depth** (color) of each earthquake.

### Features
1. **Earthquake Markers**:
   - **Marker Size**: Proportional to earthquake magnitude (larger magnitude → larger marker).
   - **Marker Color**: Corresponds to earthquake depth (shallow depths → green, deeper depths → red).
   - **Popups**: Display detailed information for each earthquake, including:
     - Magnitude
     - Location
     - Depth in kilometers

2. **Interactive Map**:
   - Base map (Street Map) provided by OpenStreetMap.

3. **Legend**:
   - Displays color-coded depth ranges with clear labels.

### Earthquake Data Source
Data is fetched dynamically from the USGS GeoJSON feed:
- URL: [https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)

---

## Part 2: Adding Tectonic Plates and Advanced Features
### Purpose
The goal of Part 2 is to enhance the map by overlaying tectonic plate boundaries alongside earthquake data, adding additional base maps, and introducing layer controls.

### Features
1. **Tectonic Plates Overlay**:
   - Tectonic plate boundaries visualized as orange lines.
   - Data is dynamically fetched from the GitHub-hosted GeoJSON:
     - URL: [https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)

2. **Earthquake Layer**:
   - Retained all features from Part 1 (styled markers, popups, dynamic fetching).

3. **Layer Controls**:
   - Toggle between overlays:
     - Earthquakes
     - Tectonic Plates
   - Switch base maps:
     - Street Map (OpenStreetMap)
     - Topographic Map (OpenTopoMap)

4. **Enhanced Legend**:
   - Clear depth-based color scale for earthquake markers.
   - Styled for clarity with a semi-transparent background, rounded corners, and shadowing.
   - Includes an explanatory note about marker size representing magnitude.

---

## Map Visualizations
### Map Functionality
- The map supports multiple layers and features:
  - **Base Maps**: Street Map and Topographic Map.
  - **Overlays**: Earthquake markers and tectonic plate boundaries.
- Users can toggle overlays and switch base maps via an interactive control panel.

### Marker Behavior
#### **Earthquake Markers**:
- **Size**: Reflects magnitude.
- **Color**: Reflects depth.
- **Popups**: Provide detailed earthquake information.

#### **Legend**:
- **Color**: Indicates depth ranges:
  - Bright green (`-10–10 km`): Very shallow earthquakes.
  - Red (`90+ km`): Very deep earthquakes.
- **Note**: Explains that marker size corresponds to magnitude.

---

## File Details
### **index.html**
- Links to Leaflet CSS/JS, D3.js, and custom files.
- Includes a `<div>` element (`id="map"`) for rendering the map.

### **style.css**
- Ensures the map takes up the full screen.
- Styles the legend with:
  - Semi-transparent white background
  - Rounded corners
  - Subtle shadowing
  - Font and spacing enhancements

### **logic.js**
- Initializes the map.
- Fetches and visualizes:
  - **Earthquake Data**: Dynamically styled by magnitude and depth.
  - **Tectonic Plate Data**: Rendered as line overlays.
- Configures layer controls and the enhanced legend.

---

## How to Run the Project
1. Clone the repository:
   ```bash
   git clone <repository-url>
2. Navigate to either Leaflet-Part-1 or Leaflet-Part-2.
3. Open the index.html file in your browser to view the map.

## Thank you for reviewing this project! Let me know if you have any feedback or suggestions.
