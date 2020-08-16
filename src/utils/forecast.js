const request = require('request')
//http://api.weatherstack.com/current?access_key=961b0d90d71f216811f41bd07c677a1d&query=37.8267,-122.4233
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=961b0d90d71f216811f41bd07c677a1d&query=' + longitude + ',' + latitude
    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(error, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
            //callback(undefined, response)
        }
    })
}

module.exports = forecast