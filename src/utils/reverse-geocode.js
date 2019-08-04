const request = require('request')
require('dotenv').config()

// console.log(process.env)
const access_token = process.env.ACCESS_TOKEN

const reverseGeocode = ( latitude, longitude, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + longitude + ',' + latitude + '.json?access_token=pk.eyJ1Ijoibml0ZXNoZ291ZDEiLCJhIjoiY2p5NXloMm93MGJuaDNsbGViNG9hancyaSJ9.U5FO1qwQsYri52GPqhPWUQ'

    
    request( { url, json: true }, (error, response) => {
        if(error){
            callback('unable to connect to location services!')
        }
        else if(response.body.features.length === 0){
            callback('unable to find location, try another location.')
        }
        else{
            callback(undefined, { location : response.body.features[0].place_name,
                 latitude : response.body.features[0].center[1],
                  longitude : response.body.features[0].center[0]})
        }
        // console.log(response.body)
    })
}


module.exports = reverseGeocode