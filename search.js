const API_KEY = "8f4d0ab3c9180ae0820be2bd2d43b0a4";
const Result = document.querySelector("#js-result");
let CITY_NAME = document.querySelector("#js-city").value;
let STATE_CODE = document.querySelector("#js-state").value;
let COUNTRY_CODE = document.querySelector("#js-country").value;

function onChange(value) {
  CITY_NAME = value;
  return CITY_NAME;
}

function getData() {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME},${STATE_CODE},${COUNTRY_CODE}&appid=${API_KEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const CITY = json.name;
      const COUNTRY = json.sys.country;
      const weather = json.weather[1];
      console.log(json);
      console.log(CITY, COUNTRY, weather);
      Result.innerHTML = `Your current weather is ${CITY}, ${COUNTRY}`;
    });
}
