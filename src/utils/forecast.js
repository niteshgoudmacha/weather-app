const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/fccad0d15e15d4e1924f781789cbc830/' + latitude + ',' + longitude

    request( { url, json : true }, (error, response) => {
        if(error) {
            callback('unable to connect to weather server!')
        }
        else if(response.body.error) {
            callback('unable to fetch weather information.')
        }
        else {
            callback(undefined, response.body.daily.data[0].summary + 'It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chances of rain')
        }
    })
}

module.exports = forecast