// Global Variables
const URL = "https://api.weatherapi.com/v1";
const API_KEY = "key=c92183db87384d8d806184544242907";
const CURRENT = "/current.json";
const FORECAST = "/forecast.json";
const QUERY_PARAM = "q=";
const DAYS_PARAM = "days=";
const DAYS = 3;
const DAWN_TIME = 7;
const NIGHT_TIME = 19;
let currentDate = '';
let currentHour = 0;
let searched = false;
let hourContainerCreated = false;
let dayContainerCreated = false;
import CONDITIONS from './assets/conditions.js';

// Functions to display details
function setCity(response) {
    let cityName = document.getElementById('city');
    cityName.innerHTML = response.toUpperCase();
}

function setCurrentTemp(response) {
    let tempF = document.getElementById('fahrenheit');
    tempF.innerHTML = Math.round(parseFloat(response.temp_f))  + "º";

    let conditionImage = document.querySelector('.background-condition');

    let requestedCondition = response.condition.text.toUpperCase().trim();
    if (CONDITIONS.has(requestedCondition)) {
        conditionImage.src = CONDITIONS.get(requestedCondition);
        conditionImage.style.display = "flex";
    }
}

function setLocalTime(response) {
    currentDate = new Date(response);
    console.log(currentDate);
    currentHour = currentDate.getHours();

    if (currentHour < DAWN_TIME || currentHour > NIGHT_TIME) {
        nightMode();
    }
}

function nightMode() {
    let body = document.querySelector('body');
    body.style.backgroundColor = "rgb(22, 22, 53)";

    let container = document.querySelector('.container');
    container.style.cssText = "background-color: rgb(22, 22, 53)";

    let hourForecast = document.querySelector('.hour-container');
    let dayForecast = document.querySelector('.day-container');
    hourForecast.style.color = "rgb(22, 22, 53)";
    dayForecast.style.color = "rgb(22, 22, 53)";
}

function setHighLow(response) {
    let today = document.querySelector('.today');
    let max = Math.round(parseFloat(response.maxtemp_f));
    let min = Math.round(parseFloat(response.mintemp_f));

    today.innerHTML = "H: " + max + "º | L: " + min + "º";
}

function setHourlyForecast(response) {
    if (hourContainerCreated) {
        let hourlyForecast = document.querySelector('.hourly-forecast');
        hourlyForecast.remove();
    }

    let todayTemps = response[0].hour;
    let tomorrowTemps = response[1].hour;
    let forecastTemps = todayTemps.concat(tomorrowTemps);

    let hourContainer = document.querySelector('.hour-container');
    hourContainer.style.display = "flex";

    let hourlyForecast = document.createElement('div');
    hourlyForecast.classList.add('hourly-forecast');

    for (let i = currentHour; i < (currentHour + 12); i++) {
        let hourlyContainer = document.createElement('div');
        hourlyContainer.classList.add('hour');
        let hour = document.createElement('p');
        hour.classList.add('forecast-hour');
        let conditionImage = document.createElement('img');
        conditionImage.classList.add('hourly-condition');
        let temp = document.createElement('p');
        temp.classList.add('hourly-temp');

        if (i === currentHour) {
            hour.innerHTML = "Now";
        } else if (i === 0) {
            hour.innerHTML = (i + 12) + "am";
        } else if (i < 12) {
            hour.innerHTML = i + "am";
        } else if (i === 12) {
            hour.innerHTML = i + "pm";
        } else if (i > 12 && i < 24) {
            hour.innerHTML = (i - 12) + "pm";
        } else if (i === 24) {
            hour.innerHTML = (i - 12) + "am";
        } else if (i > 24 && i < 36) {
            hour.innerHTML = (i - 24) + "am";
        } else {
            hour.innerHTML = (i - 24) + "pm";
        }
        hourlyContainer.append(hour);

        let requestedCondition = forecastTemps[i].condition.text.toUpperCase().trim();
        if (CONDITIONS.has(requestedCondition)) {
            conditionImage.src = CONDITIONS.get(requestedCondition);
        }
        hourlyContainer.append(conditionImage);

        temp.innerHTML = Math.round(parseFloat(forecastTemps[i].temp_f)) + "º";
        hourlyContainer.append(temp);
        
        hourlyForecast.appendChild(hourlyContainer);
    }

    hourContainer.append(hourlyForecast);

    hourContainerCreated = true;
}

function setDailyMaxMin(temps, date, forecastMap) {    
    let dailyForecast = document.querySelector('.daily-forecast');

    let dailyContainer = document.createElement('div');
    dailyContainer.classList.add('day');
    let dateContainer = document.createElement('p');
    dateContainer.classList.add('forecast-date');
    let conditionImage = document.createElement('img');
    conditionImage.classList.add('forecast-condition');
    let tempContainer = document.createElement('p');
    tempContainer.classList.add('daily-temps');

    if (currentDate.toString().slice(0,3) === date.slice(0,3)) {
        dateContainer.innerHTML = "Today";
    } else {
        dateContainer.innerHTML = date.slice(0,3);
    }
    dailyContainer.appendChild(dateContainer);

    let requestedCondition = temps.condition.toUpperCase().trim();
    if (CONDITIONS.has(requestedCondition)) {
        conditionImage.src = CONDITIONS.get(requestedCondition);
    }
    dailyContainer.appendChild(conditionImage);

    tempContainer.innerHTML = "H: " + Math.round(parseFloat(temps.max)) + "º | L: " + Math.round(parseFloat(temps.min)) + "º";
    dailyContainer.appendChild(tempContainer);
    
    dailyForecast.appendChild(dailyContainer);
}

function setDailyForecast(response) {
    if (dayContainerCreated) {
        let dailyForecast = document.querySelector('.daily-forecast');
        dailyForecast.remove();
    }

    let dailyForecast = document.createElement('div');
    dailyForecast.classList.add('daily-forecast');

    let dayContainer = document.querySelector('.day-container');
    dayContainer.append(dailyForecast);
    dayContainer.style.display = "flex";

    let forecastMap = new Map();

    for (let i = 0; i < DAYS; i++) {
        let date = new Date(response[i].date);
        forecastMap.set(date.toUTCString(), {
            max: response[i].day.maxtemp_f, 
            min: response[i].day.mintemp_f,
            condition: response[i].day.condition.text
        });
    }

    forecastMap.forEach(setDailyMaxMin);

    dayContainerCreated = true;
}

function updateDisplay() {
    let city = document.getElementById('search');
    
    city.value = "";
    city.blur();
    city.placeholder = '\u{1F50D}';
    city.style.cssText = `
        width: 30px;
        text-align: center;
        -webkit-transition: transform 1.5s;
        -moz-transition: transform 1.5s;
        -o-transition: transform 1.5s;
        -ms-transition: transform 1.5s;
        transition: transform 1.5s;
        -webkit-transform: translateX(125px);
        -moz-transform: translateX(125px);
        -o-transform: translateX(125px);
        -ms-transform: translateX(125px);
        transform: translateX(125px);
        position: absolute;
    `;

    let body = document.querySelector('.weather-body');
    body.style.display = "flex";

    let welcome = document.querySelector('.welcome');
    welcome.style.display = "none";

    let error = document.querySelector('.error');
    error.style.display = "none";

    searched = true;
}

function displaySearch() {
    let city = document.getElementById('search');

    if (searched) {
        city.style.cssText = `
            width: 225px;
            text-align: left;
            -webkit-transition: transform 1.5s;
            -moz-transition: transform 1.5s;
            -o-transition: transform 1.5s;
            -ms-transition: transform 1.5s;
            transition: transform 1.5s;
            -webkit-transform: translateX(0px);
            -moz-transform: translateX(0px);
            -o-transform: translateX(0px);
            -ms-transform: translateX(0px);
            transform: translateX(0px);
            position: relative;
        `;
    }

    searched = false;
}

function invalidRequest() {
    let body = document.querySelector('.weather-body');
    body.style.display = "none";
    
    let error = document.querySelector('.error');
    error.style.display = "flex";
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

            setCity(response.location.name);
            setLocalTime(response.location.localtime);
            setCurrentTemp(response.current);
            setHighLow(response.forecast.forecastday[0].day);
            setHourlyForecast(response.forecast.forecastday);
            setDailyForecast(response.forecast.forecastday);
            updateDisplay();
        }
        if (this.readyState === XMLHttpRequest.DONE && this.status !== 200) {
            invalidRequest();
        }
    };

    let apiCall = URL+FORECAST+"?"+API_KEY+"&"+QUERY_PARAM+city+"&"+DAYS_PARAM+DAYS;
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