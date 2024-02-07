var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature ');
const humidity = document.querySelector('.humidity ');
const pressure = document.querySelector('.pressure ');
const temp_max = document.querySelector('.tempmax ');
const windspeed = document.querySelector('.windspeed ');
const visibility = document.querySelector('.visibility ');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    humidity.textContent = "";
    pressure.textContent = "";
    temp_max.textContent = "";
    windspeed.textContent = "";
    visibility.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if (data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
                humidity.textContent = "";
                pressure.textContent = "";
                temp_max.textContent = "";
                windspeed.textContent = "";
                visibility.textContent = "";
            }
            else {
                console.log(data)
                if (data.description === "rain" || data.description === "fog") {
                    weatherIcon.className = "wi wi-day-" + data.description
                }
                else {
                    weatherIcon.className = "wi wi-day-cloudy"
                }
                visibility.textContent = data.visibility + 'm';
                windspeed.textContent = data.windspeed + "km/hr";
                temp_max.textContent = (data.temp_max - 273.16).toFixed(2) + String.fromCharCode(176);;
                pressure.textContent = data.pressure + "N/sq.m";
                humidity.textContent = data.humidity + '%';
                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature - 273.16).toFixed(2) + String.fromCharCode(176);
                weatherCondition.textContent = data.description.toUpperCase();
            }
        })
    });
})