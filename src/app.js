const path = require('path');
const express=require('express');
const app=express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const hbs = require('hbs');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Set up handlebars engine and views location
app.set('view engine', 'hbs'); // Use Handlebars as the templating engine
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Anudeep Kaddala'
    });
});
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Anudeep Kaddala'
    });
});

app.get('/help',(req,res)=>{    
    res.render('help',{
        title: 'Help',
        name: 'Anudeep Kaddala',
        message: 'This is a help page.'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(req.query.address, (error, { formattedAddress, latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: `${forecastData.weather_descriptions}. It is currently ${forecastData.temperature} degrees out. There is a ${forecastData.precip}% chance of rain.`,
                location: formattedAddress,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help Page',
        name: 'Anudeep Kaddala',
        errorMessage: 'Help article not found.'
    });
});



app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Anudeep Kaddala',
        errorMessage: 'Page not found.'
    });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});