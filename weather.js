const URL = "https://api.weatherapi.com/v1";
const apiKey = "key=c92183db87384d8d806184544242907";
const current = "/current.json";
const forecast = "/forecast.json";
const queryParam = "q=";
const daysParam = "days="

function setCurrentTemp(response) {
    let tempF = document.getElementById('fahrenheit');
    tempF.innerHTML = Math.round(parseFloat(response.temp_f))  + "º";
}

function setForecastTemp(response) {
    let today = document.querySelector('.today');
    let max = Math.round(parseFloat(response.maxtemp_f));
    let min = Math.round(parseFloat(response.mintemp_f));

    today.innerHTML = "H: " + max + "º | L: " + min + "º";
}

function changeSearchDisplay() {
    let city = document.getElementById('search');
    city.value = "";
    city.placeholder = '\u{1F50D}';
    city.style.cssText = `
        width: 20px;
        -webkit-transition: transform 2s;
        -moz-transition: transform 2s;
        -o-transition: transform 2s;
        -ms-transition: transform 2s;
        transition: transform 2s;
        -webkit-transform: translateX(125px);
        -moz-transform: translateX(125px);
        -o-transform: translateX(125px);
        -ms-transform: translateX(125px);
        position: absolute;
    `;
}

function getCity() {
    let city = document.getElementById('search').value;

    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let response = JSON.parse(this.response);

            console.log(response.location.name);
            console.log(response.current.temp_f + "ºF");
            console.log(response.current.condition.icon);

            let cityName = document.getElementById('city');
            cityName.innerHTML = response.location.name;

            setCurrentTemp(response.current);
            // console.log(response.forecast.forecastday[0].day.maxtemp_f);
            setForecastTemp(response.forecast.forecastday[0].day);

            
        }
    };

    let days = 1;
    let apiCall = URL+forecast+"?"+apiKey+"&"+queryParam+city+"&"+daysParam+days;
    console.log(apiCall);
    req.open("GET", apiCall);
    req.send();
}

window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('keydown', event => {
        if (event.code === 'Enter') {
            getCity();
            changeSearchDisplay();
        }
    })
});