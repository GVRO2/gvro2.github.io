 async function readFileEndereco() {
     var file = document.getElementById("endereco").files[0];
     let fileReader = new FileReader();
     fileReader.readAsText(file);
     fileReader.onload = async function() {
         let texto = fileReader.result;
         var linhas = texto.split("\n");
         for (let index = 0; index < linhas.length; index++) {
             if (index != 0) {
                 var colunas = linhas[index].split(';');
                 if (colunas[0] !== "") {
                     var endereco = colunas[0];
                     await converteEndereco(endereco);
                     console.log("lendo arquivo..." + index)
                 }
             }
         }
         updateMap();
         window.initMap = updateMap;
     }
     fileReader.onerror = function() {
         alert(fileReader.error);
     }
 }

 async function converteEndereco(endereco) {
     var geocoder = new google.maps.Geocoder();
     await geocoder.geocode({ 'address': endereco }, function(resultado) {
         let lat = parseFloat(resultado[0].geometry.viewport.Ua.lo);
         let lgv = parseFloat(resultado[0].geometry.viewport.Ga.lo);
         ultimaLatitude = lat;
         ultimaLongitudes = lgv;
         points.push({ location: resultado[0].geometry.location, weight: 500 });
         ultimaLongitudes = parseFloat(lgv).toFixed(6);
         ultimaLatitude = parseFloat(lat).toFixed(6);
     })
 }