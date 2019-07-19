const request = require('request')
require('dotenv').config()

// console.log(process.env)
const access_token = process.env.ACCESS_TOKEN

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + access_token + '&limit=1'
    
    request( { url, json: true }, (error, response) => {
        if(error){
            callback('unable to connect to location services!')
        }
        // console.log(response.body)
        else if(response.body.features.length === 0){
            callback('unable to find location, try another location.')
        }
        else{
            callback(undefined, { location : response.body.features[0].place_name,
                 latitude : response.body.features[0].center[1],
                  longitude : response.body.features[0].center[0]})
        }
    })
}


module.exports = geocode