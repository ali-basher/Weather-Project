const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    const query = req.body.cityName;
    const apiKey = "08584ba65d9daf07ccef2486ab250528";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function (response) {

        console.log(response.statusCode);

        response.on("data", function (data) {

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const iconCode = weatherData.weather[0].icon;
            const urlIcon = "https://openweathermap.org/img/wn/" + iconCode + "@4x.png";

            res.write("<h1> The temperature in " + query + " is " + temp + " degrees Celsius. </h1>");
            res.write("<h3> The Weather is currently " + weatherDescription + ".</h3>");
            res.write("<img src=" + urlIcon + ">");
            res.send();


        });
    });
})

app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});

