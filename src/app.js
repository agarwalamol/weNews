const express = require('express');
const app = express();
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const PORT = 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const forecastURL= 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/204848?apikey=FynP3D94HCGNIeFlAbsBTT3esCoeDmk0&details=false&metric=true';



app.get('/weather', async(req, res)=>{
    try{
        const apiResponse = await axios.get(forecastURL);
        const forecastedData = (day)=>{
            return {
                date: apiResponse.data.DailyForecasts[day].Date,
                temperature: apiResponse.data.DailyForecasts[day].Temperature.Maximum.Value,
                forecast : apiResponse.data.DailyForecasts[day].Day.IconPhrase
            }
        }
        const response = {
            count: apiResponse.data.DailyForecasts.length,
            location: 'Pune',
            unit: 'Metric',
            data : [
                forecastedData(0),
                forecastedData(1),
                forecastedData(2),
                forecastedData(3),
                forecastedData(4),
            ]
        };
        res.send(response);
    }
    catch(error){
        res.status(500).send()
    }
})

app.listen(PORT, ()=>{
    console.log('Listening on port:'+ PORT);
})