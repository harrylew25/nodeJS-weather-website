require("dotenv").config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const authorName = 'Harry Lew';
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: authorName
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: authorName
    });
});

//Setup a help template to render a help message to the screen 
//Setup the help route and render the template with an example message
//Visit the route in hte browser and see your help message print
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: authorName,
        helpText: 'This is the helpful text.'
    });
});

// app.com/weather
// wire up /weather
//require geocode/forecast into app.js
//use address to geocode
//use the coordinates to get forecast
//send back the real forecast and location
app.get('/weather', (req, res) => {
    if (!(req && req.query && req.query.address)) {
        return res.send({
            error: 'We need an address as a search parameter'
        });
    }

    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(lat, long, (forecastError, forecastData) => {
            if (forecastError) {
                return res.send({ forecastError });
            }
            res.send({
                weather: {
                    location: location,
                    address: req.query.address,
                    forecast: forecastData
                }
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }
    res.send({
        products: []
    });
});

//Goal: Create and render a 404 page for help section with handlebars
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        errorMessage: 'Help article not found.',
        name: authorName
    });
});

//Goal: Create and render a 404 page with handlebars
app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        errorMessage: 'Page not found',
        name: authorName
    });
});

//open the port
app.listen(3000, () => {
    console.log('server is up on port 3000');
});