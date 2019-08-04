const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const reverseGeocode = require('./utils/reverse-geocode.js')
const currentLocation = require('./utils/current-location.js')
require('dotenv').config()

// console.log(process.env)
// console.log(__dirname)
// console.log(__filename)
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('', {
        title: 'Weather app',
        name: 'Nitesh Goud'
    })
})


// app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Adding New Features soon...',
        title: 'Help',
        name: 'Nitesh Goud'
    })
})

// app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        title:'About',
        name:'Nitesh Goud'
    })
})
// current Location
app.get('/currentlocation', (req, res) => {
    // console.log('current location route')
    reverseGeocode(req.query.latitude, req.query.longitude, (error, {latitude, longitude, location}) => {
        if(error) {
            return res.send({ error })
        }
        // console.log(latitude,longitude,location)
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location
            })
        })
    })
    
})

// app.com/weather
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address...'
        })
    }
    // console.log('weather route')
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if(error) {
            return res.send({ error })
        }
        // console.log(latitude,longitude,location)
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nitesh Goud',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        errorMessage: 'Page not found'
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server is up on port '+ port)
})
