const URL = "http://api.weatherapi.com/v1";
const apiKey = "key=c92183db87384d8d806184544242907";
const current = "/current.json";
const queryParam = "q=";
let apiCall = URL+current+"?"+apiKey+"&"+queryParam;

const city = 'Los Angeles';

function getCurrentTemp() {

    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let response = JSON.parse(this.response);

            console.log(response.location.name);
            console.log(response.current.temp_f + "ºF");
        }
    };

    console.log(apiCall+city);
    req.open("GET", apiCall+city);
    req.send();
}

document.getElementById('get').addEventListener('click', getCurrentTemp);