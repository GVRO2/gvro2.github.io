 function processAdressFile() {
     let fileReader = new FileReader();
     var file = document.getElementById("endereco").files[0];

     fileReader.readAsText(file);

     fileReader.onload = async function() {
         readFileEndereco(fileReader.result)
     }
     fileReader.onerror = function() {
         alert(fileReader.error);
     }
 }

 async function readFileEndereco(text) {
     var rows = text.split("\n");
     var startIndex = getStartIndex();
     for (let index = startIndex; index < rows.length; index++) {
         var columns = rows[index].split(";");
         var endereco = columns[0];
         if (isValidateAdress(endereco)) {
             var rowNumber = index + 1
             console.log("Read line " + rowNumber + "of " + rows.length)
             await convertEndereco(endereco);
         }
     }
     updateMap();
     window.initMap = updateMap;
 }

 function getStartIndex() {
     var hasHeader = document.getElementById("hasfileHeader").checked;
     let startIndex;
     if (hasHeader) {
         startIndex = 0;
     } else {
         startIndex = 1;
     }
     return startIndex;
 }

 function isValidateAdress(text) {
     if (text == "") {
         return false;
     } else {
         return true;
     }
 }

 function isValidateData(index, columns) {
     var hasHeader = document.getElementById("hasfileHeader").checked;
     if (hasHeader) {
         if (index === 0) {
             return false;
         }
     } else {
         if (columns[index] === "") {
             return true;
         }
     }

     return false;
 }

 async function convertEndereco(endereco) {
     var geocoder = new google.maps.Geocoder();
     await geocoder.geocode({ 'address': endereco }, function(resultado) {
         points.push({ location: resultado[0].geometry.location, weight: 500 });
     })
 }