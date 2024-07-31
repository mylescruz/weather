// Global Variables
const URL = "https://api.weatherapi.com/v1";
const KEY_FILE = './assets/key.txt';
const API_KEY = "key=c92183db87384d8d806184544242907";
const CURRENT = "/current.json";
const FORECAST = "/forecast.json";
const QUERY_PARAM = "q=";
const DAYS_PARAM = "days=";
const DAWN_TIME = 7;
const NIGHT_TIME = 19;
let currentDate = '';
let currentHour = 0;

// Functions to display details
function setCurrentTemp(response) {
    let tempF = document.getElementById('fahrenheit');
    tempF.innerHTML = Math.round(parseFloat(response.temp_f))  + "º";

    if (currentHour < DAWN_TIME && currentHour > NIGHT_TIME) {
        let container = document.querySelector('.container');
        container.style.cssText = "background-color: rgb(22, 22, 53)";
    }
}

function setLocalTime(response) {
    currentDate = new Date(response);
    console.log(currentDate);
    currentHour = currentDate.getHours();
}

function setHighLow(response) {
    let today = document.querySelector('.today');
    let max = Math.round(parseFloat(response.maxtemp_f));
    let min = Math.round(parseFloat(response.mintemp_f));

    today.innerHTML = "H: " + max + "º | L: " + min + "º";
}

function setHourlyForecast(response) {
    let hourlyForecast = document.querySelector('.hourly-forecast');
    hourlyForecast.style.display = "flex";

    for (let i = currentHour; i < 24; i++) {
        let hourlyContainer = document.createElement('div');
        hourlyContainer.classList.add('hour');
        let hour = document.createElement('p');
        hour.classList.add('hourly-hour');
        let temp = document.createElement('p');
        temp.classList.add('hourly-temp');

        if (i >= 12) {
            if ( i === 23) {
                hour.innerHTML = (i + 1 - 12) + "am";
            } else {
                hour.innerHTML = (i + 1 - 12) + "pm";
            }
        } else {
            hour.innerHTML = (i + 1) + "am";
        }

        temp.innerHTML = Math.round(parseFloat(response[i].temp_f)) + "º";
        hourlyContainer.append(hour);
        hourlyContainer.append(temp);
        hourlyForecast.appendChild(hourlyContainer);
    }
}

function moveSearchBar() {
    let city = document.getElementById('search');
    
    city.value = "";
    city.blur();
    city.placeholder = '\u{1F50D}';
    city.style.cssText = `
        width: 20px;
        -webkit-transition: transform 1.5s;
        -moz-transition: transform 1.5s;
        -o-transition: transform 1.5s;
        -ms-transition: transform 1.5s;
        transition: transform 1.5s;
        -webkit-transform: translateX(125px);
        -moz-transform: translateX(125px);
        -o-transform: translateX(125px);
        -ms-transform: translateX(125px);
        position: absolute;
    `;
}

function displaySearch() {
    let city = document.getElementById('search');

    if (city.style.width === "20px") {
        city.style.cssText = `
            width: 200px;
            -webkit-transition: transform 1.5s;
            -moz-transition: transform 1.5s;
            -o-transition: transform 1.5s;
            -ms-transition: transform 1.5s;
            transition: transform 1.5s;
            -webkit-transform: translateX(0px);
            -moz-transform: translateX(0px);
            -o-transform: translateX(0px);
            -ms-transform: translateX(0px);
            position: relative;
        `;
    }
}

// Function to get city details from the Weather API
function getCity() {
    let city = document.getElementById('search').value;

    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let response = JSON.parse(this.response);

            console.log(response.location.name);
            console.log(response.current.temp_f + "ºF");

            let cityName = document.getElementById('city');
            cityName.innerHTML = response.location.name.toUpperCase();

            setLocalTime(response.location.localtime);
            setCurrentTemp(response.current);
            setHighLow(response.forecast.forecastday[0].day);
            setHourlyForecast(response.forecast.forecastday[0].hour);
            moveSearchBar();
        }
    };

    let days = 1;
    let apiCall = URL+FORECAST+"?"+API_KEY+"&"+QUERY_PARAM+city+"&"+DAYS_PARAM+days;
    console.log(apiCall);
    req.open("GET", apiCall);
    req.send();
}

// Handle app events
window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('keydown', event => {
        if (event.code === 'Enter') {
            getCity();
        }

        document.getElementById('search').addEventListener('focus', displaySearch);
    });
});