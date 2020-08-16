const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const options = {
    extensions: ['htm', 'html']
}

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath, options))

app.get('', (req, res) => {
    res.render('index',{
        title: 'index',
        name: 'SAM ESMAIL'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Onion Fanatic'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Dmitri',
        helpText: 'Help.'

    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address){
        /*
        return res.send({
            error: 'Address must be provided'
        })
        */
       geocode(req.query.address = 'Houston', (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forcast: forecastdata,
                location: location,
                address: req.query.address
                
        
            })
        })
        
    })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forcast: forecastdata,
                location: location,
                address: req.query.address
                
        
            })
        })
        
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Dmitri',
        errorMessage: 'Help article not found.'

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Dmitri',
        errorMessage: 'Page not found.'

    })
})


app.listen(3000, () => {
    console.log('server is up on p 3000')
})