const request = require('request')
require('dotenv').config()

const API_KEY = process.env.WEATHER_API_KEY
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/' + API_KEY + '/' + latitude + ',' + longitude + '?units=si'

    request( { url, json : true }, (error, response) => {
        //console.log(response)
        if(error) {
            callback('unable to connect to weather server!')
        }
        else if(response.body.error) {
            callback('unable to fetch weather information.')
        }
        else {
            callback(undefined, response.body.daily.data[0].summary + 'It is currently ' + response.body.currently.temperature + ' degrees Celsius. There is a ' + response.body.currently.precipProbability + '% chances of rain')
        }
    })
}


module.exports = forecast