const mysql = require("mysql");
const express = require('express');
const hbs = require("hbs");
const path = require("path");
const app = express();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydatabase",
    connectionLimit: 10
});

function ADDTODATABASE(temp_max, pressure, visibility, windspeed, humidity, Temp, Desc, City) {
    con.connect(function (err) {
        // if (err) throw err;
        console.log("connected", temp_max, pressure, visibility, windspeed, humidity, Temp, Desc, City);
        var sql = "INSERT INTO weather_data_3(Temp_max,Pressure, Visibility, Windspeed, Humidity,Temperature,Description,Cityname) VALUES?";
        var value = [[temp_max - 273.15, pressure, visibility, windspeed, humidity, Temp - 273.15, Desc, City]]
        con.query(sql, [value], function (err, results) {
        })
    })

};

const weatherData = require('../utils/weatherData');
console.log(weatherData, 'sfsfs')
const { createConnection } = require("net");

const port = 3000

const publicStaticDirPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    })
})

//localhost:3000/weather?address=lahore
app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }

    weatherData(address, (error, { temp_max, pressure, visibility, windspeed, humidity, temperature, description, cityName } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        ADDTODATABASE(temp_max, pressure, visibility, windspeed, humidity, temperature, description, cityName);
        res.send({
            temp_max,
            pressure,
            visibility,
            windspeed,
            humidity,
            temperature,
            description,
            cityName
        })
    })
});


app.get("*", (req, res) => {
    res.render('404', {
        title: "page not found"
    })
})


app.listen(port, () => {
    console.log("Server is up and running on port: ", port);
})