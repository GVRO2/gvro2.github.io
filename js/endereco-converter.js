 var resultsRequestAdress = [];

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
     var startIndex = getStartIndex("hasfileHeader");
     for (let index = startIndex; index < rows.length; index++) {
         var columns = rows[index].split(";");
         var endereco = columns[0];
         if (isValidateData(endereco)) {
             var rowNumber = index + 1
             console.log("Read line " + rowNumber + "of " + rows.length)
             await convertEndereco(endereco);
         }
     }
     updateMap();
     window.initMap = updateMap;
     downloadCsv();
 }

 async function convertEndereco(endereco) {
     var geocoder = new google.maps.Geocoder();
     await geocoder.geocode({ 'address': endereco }, function(resultado) {
         points.push({ location: resultado[0].geometry.location, weight: 500 });
         resultsRequestAdress.push(resultado[0]);
     })
 }