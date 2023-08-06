var timeFinishedProcess;

function downloadCsv() {
    const hoje = new Date();
    var timestamp = hoje.getTime();
    var content = buildCsvReturn();
    const blob = new Blob([content], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `endereco-completo-${timestamp}.csv`;
    link.click();

}

function buildCsvReturn() {
    var text = "latitude;longetude;formattedAddress;cep;streetName;streetNumber;city;state;country\n"
    resultsRequestAdress.forEach(result => {
        try {
            var latitude = getLatitude(result);
            var longetude = getLongetude(result);
            var formattedAddress = getFormattedAddress(result);
            var cep = getCEP(result);
            var streetName = getStreetName(result);
            var streetNumber = getStreetNumber(result);
            var city = getCity(result);
            var state = getState(result);
            var country = getCountry(result);
            text += `${latitude};${longetude};${formattedAddress};${cep};${streetName};${streetNumber};${city};${state};${country}\n`
        } catch {
            console.log("erro ao salvar escrever resultado: " + JSON.stringify(result))
        }
    });
    timeFinishedProcess = new Date();

    return addMetrics(text)
}

function addMetrics(text) {
    const difference = timeFinishedProcess.getTime() - timeInitProcess.getTime();
    const hour = difference / 3600000;
    const minutes = (difference % 3600000) / 60000;
    const seconds = (difference % 60000) / 1000;

    text += `;;;processDuration=${hour} hour, ${minutes} minutes,${seconds} seconds`
    return text;
}

function getStreetNumber(result) {
    try {
        return result.address_components.filter((component) => component.types[0] === "street_number")[0].long_name;
    } catch {
        return "not returned by google maps"
    }

}

function getStreetName(result) {
    try {
        return result.address_components.filter((component) => component.types[0] === "route")[0].long_name;
    } catch {
        return "not returned by google maps"
    }
}

function getCity(result) {
    try {
        return result.address_components.filter((component) => component.types[0] === "administrative_area_level_2")[0].long_name;
    } catch {
        return "not returned by google maps"
    }
}

function getState(result) {
    try {
        return result.address_components.filter((component) => component.types[0] === "administrative_area_level_1")[0].long_name;
    } catch {
        return "not returned by google maps"
    }
}

function getFormattedAddress(result) {
    try {
        return result.formatted_address;
    } catch {
        return "not returned by google maps"
    }
}

function getLatitude(result) {
    try {
        return result.geometry.location.lat();
    } catch {
        return "not returned by google maps"
    }
}

function getLongetude(result) {
    try {
        return result.geometry.location.lng();
    } catch {
        return "not returned by google maps"
    }
}

function getCEP(result) {
    try {
        return result.address_components.filter((component) => component.types[0] === "postal_code")[0].long_name;
    } catch {
        return "not returned by google maps"
    }
}

function getCountry(result) {
    try {
        return result.address_components.filter((component) => component.types[0] === "country")[0].long_name;
    } catch {
        return "not returned by google maps"
    }
}