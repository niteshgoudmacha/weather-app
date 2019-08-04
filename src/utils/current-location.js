const request = require('request')
require('dotenv').config()

// console.log(process.env)
const access_token = process.env.IP_TOKEN

const currentLocation = (callback) => {
    const url = 'http://api.ipstack.com/check?access_key=' + access_token + '&output=json'

    request( { url, json: true }, (error, response) => {
        if(error){
            callback('unable to connect to location services!', undefined)
        }
        else{
            callback(undefined, { location : (response.body.city + ',' + response.body.region_name +',' + response.body.country_name),
                 latitude : response.body.latitude,
                  longitude : response.body.longitude})
        }
        // console.log(response.body)
    })
}


module.exports = currentLocation