var resultTest;

function downloadCsv() {
    const hoje = new Date();
    var timestamp = hoje.getTime();
    var content = buildCsvReturn();
    // Crie um novo objeto blob
    const blob = new Blob([content], { type: 'text/csv' });

    // Crie um novo link
    const link = document.createElement('a');

    // Defina o href do link para o blob
    link.href = window.URL.createObjectURL(blob);

    // Defina o download do link para 'file.csv'
    link.download = `endereco-completo-${timestamp}.csv`;

    // Mostre o link
    link.click();

}

function buildCsvReturn() {
    var text = "latitude;longetude;formattedAddress;cep;streetName;streetNumber;city;state;country\n"
    resultsRequestAdress.forEach(result => {
        var latitude = getLatitude(result);
        var longetude = getLongetude(result);
        var formattedAddress = getFormattedAddress(result);
        var cep = getCEP(result);
        var streetName = getStreetName(result);
        var streetNumber = getStreetNumber(result);
        var city = getCity(result);
        var state = getState(result);
        var country = getCountry(result);
        console.log("streetNumber:" + streetNumber)
        console.log("formattedAddress: " + formattedAddress)
        console.log("latitude: " + latitude)
        console.log("longetude: " + longetude)
        console.log("streetName: " + streetName)
        console.log("city: " + city)
        console.log("state: " + state)
        console.log("country: " + country)
        console.log("cep: " + cep)
        console.log(result)
        resultTest = result
        text += `${latitude};${longetude};${formattedAddress};${cep};${streetName};${streetNumber};${city};${state};${country}\n`
    });
    return text
}

function getStreetNumber(result) {
    return result.address_components.filter((component) => component.types[0] === "street_number")[0].long_name;
}

function getStreetName(result) {
    return result.address_components.filter((component) => component.types[0] === "route")[0].long_name;
}

function getCity(result) {
    return result.address_components.filter((component) => component.types[0] === "administrative_area_level_2")[0].long_name;
}

function getState(result) {
    return result.address_components.filter((component) => component.types[0] === "administrative_area_level_1")[0].long_name;
}

function getFormattedAddress(result) {
    return result.formatted_address;
}

function getLatitude(result) {
    return result.geometry.location.lat();
}

function getLongetude(result) {
    return result.geometry.location.lng();
}

function getCEP(result) {
    return result.address_components.filter((component) => component.types[0] === "postal_code")[0].long_name;
}

function getCountry(result) {
    return result.address_components.filter((component) => component.types[0] === "country")[0].long_name;
}