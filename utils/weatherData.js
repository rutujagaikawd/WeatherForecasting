const request = require('request');
const constants = require('../config');

const weatherData = (address, callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    console.log(url, 'url')
    request({ url, json: true }, (error, { body }) => {
        console.log(body);
        if (error) {
            callback("Can't fetch data from open weather map api ", undefined)
        } else if (!body.main || !body.main.temp || !body.name || !body.weather) {
            callback("Unable to find required data, try another location", undefined);
        } else {
            callback(undefined, {
                temp_max: body.main.temp_max,
                pressure: body.main.pressure,
                visibility: body.visibility,
                windspeed: body.wind.speed,
                humidity: body.main.humidity,
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })
}


module.exports = weatherData;
