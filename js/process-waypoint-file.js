 // This example requires the Visualization library. Include the libraries=visualization
 // parameter when you first load the API. For example:
 // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">
 let map, heatmap;

 let points = [];
 let latitudes = [];
 let longitudes = [];

 async function processWaypointFile() {
     let file = getFile("waypoints");
     let fileReader = new FileReader();

     fileReader.readAsText(file);
     fileReader.onload = function() {
         readFileWaypoint(fileReader.result);
     };
     fileReader.onerror = function() {
         alert(fileReader.error);
     };

 }

 function getFile(elementId) {
     let input = document.getElementById(elementId);
     return input.files[0];
 }

 function readFileWaypoint(texto) {
     var rows = texto.split("\n");
     for (let index = 0; index < rows.length; index++) {
         var latLong = getLatLong(rows[index])
         if (isValidateData(latLong[0]) && isValidateData(latLong[1])) {
             saveDataInRunTime(latLong[0], latLong[1]);
         }
     }
     updateMap();
 }

 function isValidateData(text) {
     if (text == "") {
         return false;
     } else {
         return true;
     }
 }

 function getLatLong(row) {
     return row.split(';');
 }

 function saveDataInRunTime(lat, long) {
     var sanitizeLat = sanitizeData(lat);
     var sanitizeLong = sanitizeData(long);
     latitudes.push(sanitizeLat);
     longitudes.push(sanitizeLong);
 }

 function sanitizeData(dirtyPoint) {
     var sanitizeString = dirtyPoint.replaceAll("/r", "").replaceAll("\r", "").replaceAll(",", ".");
     return parseFloat(sanitizeString).toFixed(6);
 }

 function updateMap() {
     pushPoints();
     map = new google.maps.Map(document.getElementById("map"), {
         zoom: 13,
         center: points[points.length - 1].location,
         mapTypeId: "roadmap",
     });
     heatmap = new google.maps.visualization.HeatmapLayer({
         data: points,
         map: map,
     });
     window.initMap = updateMap;
 }


 function pushPoints() {
     var startIndex = getStartIndex("hasfileHeaderWaypoint")
     for (let index = startIndex; index < latitudes.length; index++) {
         let lat = parseFloat(latitudes[index]);
         let lgv = parseFloat(longitudes[index]);
         points.push({ location: new google.maps.LatLng(lat, lgv), weight: 1000 });
     }
 }

 function getStartIndex(elementId) {
     var hasHeader = document.getElementById(elementId).checked;
     let startIndex;
     if (hasHeader) {
         startIndex = 1;
     } else {
         startIndex = 0;
     }
     return startIndex;
 }