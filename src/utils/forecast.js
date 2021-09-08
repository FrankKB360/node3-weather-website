const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=69319d2e6762c2ac19106c1b990b9ffc&query='+ lat + ',' + long + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('No weather service', undefined)
        } else if (body.error) {
            callback(`Unable to find location`, undefined)
        } else {
            callback(undefined, {
                descr: body.current.weather_descriptions,
                temp: body.current.temperature
            })
        }
    })
}

module.exports = forecast