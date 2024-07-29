const URL = "https://api.weatherapi.com/v1";
const apiKey = "key=c92183db87384d8d806184544242907";
const current = "/current.json";
const queryParam = "q=";
let apiCall = URL+current+"?"+apiKey+"&"+queryParam;

function setTemp(response) {
    let cityName = document.getElementById('city');
    let tempF = document.getElementById('fahrenheit');

    cityName.innerHTML = response.location.name;
    tempF.innerHTML = response.current.temp_f  + "ºF";
}

function getCurrentTemp() {
    let city = document.getElementById('city-search').value;

    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let response = JSON.parse(this.response);

            console.log(response.location.name);
            console.log(response.current.temp_f + "ºF");

            setTemp(response)
        }
    };

    console.log(apiCall+city);
    req.open("GET", apiCall+city);
    req.send();
}

document.getElementById('get').addEventListener('click', getCurrentTemp);