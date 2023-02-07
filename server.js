const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function() {
    console.log("Server started on port 3000");
})

app.get("/", function(req, res) {

   res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    
    const city = req.body.cityName;
    const apiKey = "291c8ba27bc8a1959960bb8606d00e28"
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
        
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const weatherDescription = weatherData.weather[0].description;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weathrer is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + city + " is " + temp + "deegrees Celcius</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })   
    })
})

