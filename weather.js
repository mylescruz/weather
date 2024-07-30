const URL = "https://api.weatherapi.com/v1";
const KEY_FILE = './assets/key.txt';
const API_KEY = "key=c92183db87384d8d806184544242907";
const CURRENT = "/current.json";
const FORECAST = "/forecast.json";
const QUERY_PARAM = "q=";
const DAYS_PARAM = "days=";
const NIGHT_TIME = 19;

function setCurrentTemp(response) {
    let tempF = document.getElementById('fahrenheit');
    tempF.innerHTML = Math.round(parseFloat(response.temp_f))  + "º";

    let currentDate = Date.now();
    let currentTime = new Date(currentDate);
    let currentHour = currentTime.getHours();
    if (currentHour > NIGHT_TIME) {
        let container = document.querySelector('.container');
        container.style.cssText = "background-color: rgb(22, 22, 53)";
    }
}

function setHighLow(response) {
    let today = document.querySelector('.today');
    let max = Math.round(parseFloat(response.maxtemp_f));
    let min = Math.round(parseFloat(response.mintemp_f));

    today.innerHTML = "H: " + max + "º | L: " + min + "º";
}

function setTodaysForecast(response) {
    let todayForecast = document.querySelector('.today-forecast');
    todayForecast.style.cssText = "display: flex";

    let hourlyTemp = new Array(24);
    for (let i = 0; i < 24; i++) {
        hourlyTemp[i] = Math.round(parseFloat(response[i].temp_f));
    }
    console.log(hourlyTemp);

    let currentDate = Date.now();
    let currentTime = new Date(currentDate);
    let hours = currentTime.getHours();
    
    let hourlyHeader = document.querySelector('.hourly-headers');
    let hourlyBody = document.querySelector('.hourly-bodys');

    for (let i = hours; i < 24; i++) {
        let hour = document.createElement('th');
        let temp = document.createElement('td');

        if (i >= 12) {
            hour.innerHTML = (i + 1 - 12);
        } else {
            hour.innerHTML = (i + 1);
        }

        temp.innerHTML = hourlyTemp[i];
        hourlyHeader.appendChild(hour);
        hourlyBody.appendChild(temp);
    }
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

function displaySearch() {
    let city = document.getElementById('search');

    if (city.style.width === "20px") {
        city.style.cssText = `
            width: 100%;
            -webkit-transition: transform 2s;
            -moz-transition: transform 2s;
            -o-transition: transform 2s;
            -ms-transition: transform 2s;
            transition: transform 2s;
            -webkit-transform: translateX(0px);
            -moz-transform: translateX(0px);
            -o-transform: translateX(0px);
            -ms-transform: translateX(0px);
            position: relative;
        `;
    }
}

function getCity() {
    let city = document.getElementById('search').value;

    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let response = JSON.parse(this.response);

            console.log(response.location.name);
            console.log(response.current.temp_f + "ºF");

            let cityName = document.getElementById('city');
            cityName.innerHTML = response.location.name;

            setCurrentTemp(response.current);
            setHighLow(response.forecast.forecastday[0].day);
            setTodaysForecast(response.forecast.forecastday[0].hour);
            
            changeSearchDisplay();
        }
    };

    let days = 1;
    let apiCall = URL+FORECAST+"?"+API_KEY+"&"+QUERY_PARAM+city+"&"+DAYS_PARAM+days;
    console.log(apiCall);
    req.open("GET", apiCall);
    req.send();
}

window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('keydown', event => {
        if (event.code === 'Enter') {
            getCity();
        }

        document.getElementById('search').addEventListener('focus', displaySearch);
    });
});