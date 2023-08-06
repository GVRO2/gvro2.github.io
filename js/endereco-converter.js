 var resultsRequestAdress = [];
 var continuarLeitura = true;
 var timeInitProcess;

 function processAdressFile() {
     timeInitProcess = new Date();
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
         var addressIndex = getAdressIndex();
         var endereco = columns[addressIndex];
         if (isValidateData(endereco)) {
             if (continuarLeitura) {
                 var rowNumber = index + 1
                 console.log("Read line " + rowNumber + " of " + rows.length)
                 await convertEndereco(endereco);
             } else {
                 console.log("Cancelando leitura")
                 break;
             }
         }
     }
     updateMap();
     window.initMap = updateMap;
     console.log("Mapa Atualizado")
     downloadCsv();
 }

 function cancelarLeitura() {
     continuarLeitura = false;
 }

 function getAdressIndex() {
     var input = document.getElementById("columnAdressComplete").value;
     if (input === "") {
         return 0;
     } else {
         return parseInt(input) - 1;
     }
 }

 async function convertEndereco(endereco) {
     var geocoder = new google.maps.Geocoder();
     try {
         await geocoder.geocode({ 'address': endereco }, function(resultado) {
             try {
                 points.push({ location: resultado[0].geometry.location, weight: 500 });
                 resultsRequestAdress.push(resultado[0]);
             } catch (error) {
                 console.log("Erro ao criar o objeto location: " + JSON.stringify(resultado) + error)
             }
         })
     } catch (error) {
         console.log("Erro ao chamar api do google: " + error)
     }
 }