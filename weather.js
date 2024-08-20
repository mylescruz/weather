import CONDITIONS from './assets/conditions.js';
import KEY from './assets/api.js';

// Global Variables
const URL = "https://api.weatherapi.com/v1";
const API_KEY = "key="+KEY;
const CURRENT = "/current.json";
const FORECAST = "/forecast.json";
const QUERY_PARAM = "q=";
const DAYS_PARAM = "days=";
const DAYS = 3;
const DAWN_TIME = 7;
const NIGHT_TIME = 19;
const SCREEN_WIDTH = window.matchMedia("(max-width: 768px)");
const PRIMARY_BLUE_MORNING = "rgb(70, 153, 216)";
const SECONDARY_BLUE_MORNING = "rgb(209, 233, 244)";
const PRIMARY_BLUE_NIGHT = "rgb(22, 22, 53)";
const SECONDARY_BLUE_NIGHT = "rgb(77, 77, 107)";
let currentDate = '';
let currentHour = 0;
let searched = false;
let hourContainerCreated = false;
let dayContainerCreated = false;

// Display current city details
function setCurrentCity(location) {
    document.getElementById('city').innerHTML = location.name.toUpperCase();

    currentDate = new Date(location.localtime);
    console.log(currentDate);
    currentHour = currentDate.getHours();

    if (currentHour < DAWN_TIME || currentHour > NIGHT_TIME) {
        nightMode();
    } else {
        dayMode();
    }
}

// Set current city's temperature
function setCurrentTemp(current) {
    document.getElementById('fahrenheit').innerHTML = Math.round(parseFloat(current.temp_f))  + "º";

    const requestedCondition = current.condition.text.toUpperCase().trim();

    // Show current weather condition in the background
    if (CONDITIONS.has(requestedCondition)) {
        let conditionImage = document.querySelector('.background-condition');
        conditionImage.src = CONDITIONS.get(requestedCondition);
        conditionImage.style.display = "flex";
    }
}

// Change app style during day time
function dayMode() {
    document.querySelector('body').style.backgroundColor = SECONDARY_BLUE_MORNING;
    document.querySelector('.container').style.cssText = "background-color: " + PRIMARY_BLUE_MORNING;
    document.querySelector('.hour-container').style.color = PRIMARY_BLUE_MORNING;
    document.querySelector('.day-container').style.color = PRIMARY_BLUE_MORNING;
}

// Change app style during night time
function nightMode() {
    changeBackground(SCREEN_WIDTH);

    document.querySelector('.container').style.cssText = "background-color: " + PRIMARY_BLUE_NIGHT;
    document.querySelector('.hour-container').style.color = PRIMARY_BLUE_NIGHT;
    document.querySelector('.day-container').style.color = PRIMARY_BLUE_NIGHT;

    SCREEN_WIDTH.addEventListener('change', () => {
        changeBackground(SCREEN_WIDTH);
    });  
}

// Change background when the screen adjusts
function changeBackground(screen) {
    if (currentHour < DAWN_TIME || currentHour > NIGHT_TIME) {
        if (screen.matches) { 
            document.querySelector('body').style.backgroundColor = PRIMARY_BLUE_NIGHT;
        } else {
            document.querySelector('body').style.backgroundColor = SECONDARY_BLUE_NIGHT;
        }
    } else {
        if (screen.matches) { 
            document.querySelector('body').style.backgroundColor = PRIMARY_BLUE_MORNING;
        } else {
            document.querySelector('body').style.backgroundColor = SECONDARY_BLUE_MORNING;
        }
    }
}

// Set the searched city's high and low for the day
function setHighLow(day) {
    const high = Math.round(parseFloat(day.maxtemp_f));
    const low = Math.round(parseFloat(day.mintemp_f));

    document.querySelector('.today').innerHTML = "H: " + high + "º | L: " + low + "º";
}

// Display the forecast temperatures for the upcoming hours of the day
function setHourlyForecast(forecastDays) {
    if (hourContainerCreated) {
        document.querySelector('.hourly-forecast').remove();
    }

    // Create an array for the hourly forecast for the next 12 hours
    const hourForecastTemps = new Array();
    forecastDays.forEach(function(day, index, forecastDays) {
        if (index !== forecastDays.length - 1) {
            day.hour.forEach(item => {
                hourForecastTemps.push(item);
            });
        }
    });

    const hourContainer = document.querySelector('.hour-container');
    hourContainer.style.display = "flex";

    let hourlyForecast = document.createElement('div');
    hourlyForecast.classList.add('hourly-forecast');

    const totalForecastHours = currentHour + 12;

    // Display forecast for the next 12 hours
    for (let i = currentHour; i < totalForecastHours; i++) {
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

        const requestedCondition = hourForecastTemps[i].condition.text.toUpperCase().trim();
        
        if (CONDITIONS.has(requestedCondition)) {
            conditionImage.src = CONDITIONS.get(requestedCondition);
        }
        hourlyContainer.append(conditionImage);

        temp.innerHTML = Math.round(parseFloat(hourForecastTemps[i].temp_f)) + "º";
        hourlyContainer.append(temp);
        
        hourlyForecast.appendChild(hourlyContainer);
    }

    hourContainer.append(hourlyForecast);

    hourContainerCreated = true;
}

// Set the high, low and condition for the future forecasted days
function setDailyMaxMin(temps, date) {    
    const dailyForecast = document.querySelector('.daily-forecast');

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

    const requestedCondition = temps.condition.toUpperCase().trim();
    if (CONDITIONS.has(requestedCondition)) {
        conditionImage.src = CONDITIONS.get(requestedCondition);
    }
    dailyContainer.appendChild(conditionImage);

    tempContainer.innerHTML = "H: " + Math.round(parseFloat(temps.max)) + "º | L: " + Math.round(parseFloat(temps.min)) + "º";
    dailyContainer.appendChild(tempContainer);
    
    dailyForecast.appendChild(dailyContainer);
}

// Display the forecast temperatures for the upcoming days of the week
function setDailyForecast(forecastDays) {
    if (dayContainerCreated) {
        document.querySelector('.daily-forecast').remove();
    }

    let dailyForecast = document.createElement('div');
    dailyForecast.classList.add('daily-forecast');

    const dayContainer = document.querySelector('.day-container');
    dayContainer.append(dailyForecast);
    dayContainer.style.display = "flex";

    const dayForecastMap = new Map();
    forecastDays.forEach(item => {
        let date = new Date(item.date);
        dayForecastMap.set(date.toUTCString(), {
            max: item.day.maxtemp_f, 
            min: item.day.mintemp_f,
            condition: item.day.condition.text
        });
    });

    dayForecastMap.forEach(setDailyMaxMin);

    dayContainerCreated = true;
}

// Shrink search bar after search completed
function updateSearchBar() {
    const searchBar = document.getElementById('search');
    
    searchBar.value = "";
    searchBar.blur();
    searchBar.placeholder = '\u{1F50D}';
    searchBar.style.cssText = `
        width: 30px;
        text-align: center;
        -webkit-transition: transform 1.5s;
        -moz-transition: transform 1.5s;
        -o-transition: transform 1.5s;
        -ms-transition: transform 1.5s;
        transition: transform 1.5s;
        -webkit-transform: translateX(150px);
        -moz-transform: translateX(150px);
        -o-transform: translateX(150px);
        -ms-transform: translateX(150px);
        transform: translateX(150px);
        position: absolute;
    `;

    document.querySelector('.weather-body').style.display = "flex";
    document.querySelector('.welcome').style.display = "none";
    document.querySelector('.error').style.display = "none";

    searched = true;
}

// Increase width of search bar when a user wants to search a new city
function displaySearch() {
    if (searched) {
        document.getElementById('search').style.cssText = `
            width: 75%;
            text-align: left;
            -webkit-transition: transform 1.5s;
            -moz-transition: transform 1.5s;
            -o-transition: transform 1.5s;
            -ms-transition: transform 1.5s;
            transition: transform 1.5s;
            -webkit-transform: translateX(0%);
            -moz-transform: translateX(0%);
            -o-transform: translateX(0%);
            -ms-transform: translateX(0%);
            transform: translateX(0%);
            position: relative;
        `;
    }

    searched = false;
}

// Display error message
function invalidRequest() {
    document.querySelector('.weather-body').style.display = "none";
    document.querySelector('.error').style.display = "flex";
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
            
            setCurrentCity(response.location);
            setCurrentTemp(response.current);
            setHighLow(response.forecast.forecastday[0].day);
            setHourlyForecast(response.forecast.forecastday);
            setDailyForecast(response.forecast.forecastday);
            updateSearchBar();
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