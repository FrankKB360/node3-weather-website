const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Frank van de Groep'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        author: 'Frank van de Groep'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App Help',
        author: 'Frank van de Groep',
        message: 'This is the help section of the Weather app.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address to work with'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({error})
            }
            const data = {
                location,
                forecast: forecastdata,
                address: req.query.address
            }
            res.send(data)
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Weather App Help',
        author: 'Frank van de Groep',
        errormessage: 'Missing help article'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Weather App Help',
        author: 'Frank van de Groep',
        errormessage: 'Missing page'
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})


