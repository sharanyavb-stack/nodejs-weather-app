const express = require('express');
const path = require('path');
const {geoCode, forecast} = require('./utils/geocode')
const hbs = require('hbs'); // hbs  to create partial application (reusable modules)

const  app = express();
const port = process.env.PORT || 3000;
// define paths for Express config
// we should provide absolute path when we are integrating static HTML
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views folder customization
app.set('views', viewsPath);
app.set('view engine', 'hbs'); // To get handlebars setup
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory)); // static means assets are static . how many times we load page we get same page
// Handlebars are used to create dynamic pages
app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather Good',
        name: 'Sharanya'
    })
})
app.get('/about', (req, res)=> {
    res.render('about', {
        info: 'Its all about Life',
        name: 'sharanya',
        title: 'About Me'
    })
})
app.get('/help', (req, res)=> {
    res.render('help', {
        message: 'Contact 9652260966',
        title: 'Need Help?',
        name: 'Pavan Avirneni'
    })
})
// static loading pages
// Passing query string
app.get('/weather', (req, res)=> {
    if(!req.query.address) {
        return res.send({
            error: "Address is mandatory"
        })
    }
    geoCode(req.query.address, (err, {latitude, longitude} = {}) => {
        if(err) {
            return res.send({err})
        }
        forecast(latitude, longitude, (error, forcastData)=> {
            if(error) {
                return res.send({error})
            } else {
                res.send({
                    forecast: forcastData,
                    location: req.query.address,
                    address: req.query.address
                })
            }
        })
    })
})
// Passing query string
app.get('/products', (req, res)=> {
    console.log(req.query); // object of query string
    if (!req.query.search) {
        return res.send({ // res.send() should be only once per call
            error: 'Search is mandatory'
        })
    }
    res.send({
        products: []
    })
})
// for extended URLs like /help/moreinfo or /help/hdmsa
app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: '404',
        name: 'Pavan',
        errMsg: '404 Not found'
    })
}) 

// for Page 404 Not found/.. This should come at last
app.get('*', (req, res)=> {
    res.render('404', {
        title: '404',
        name: 'Pavan',
        errMsg: '404 Not found'
    })
}) 

// app.get('', (req, res)=> {
//     res.send('<h1>Hello Express!!<h1>'); // what do we get on response 
// }) // what to do when someone visits url
// app.get('/help', (req, res)=> {
//     res.send([{name:'sharanya', age: 23}, {name: 'pavan', age: 25}])
// })
// app.get('/about', (req, res)=> {
//     res.send('About Page')
// })

app.listen(port, () => {// 3000 is port and this helps to start server
// runs when server is up.. 
console.log('Server is up on port' + port);
}) // use localhost:3000 in browser to see result