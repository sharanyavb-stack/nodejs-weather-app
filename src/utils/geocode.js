const request = require('request');
const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoic2hhcmFueWF2YjEyMyIsImEiOiJja3BnamNoMzcyaHRoMnBubGNkc2I4ZThsIn0.xSpcpa-0R_mY_mDt9UhNTg&limit=1";
    request({
        url,
        json: true
    }, (err, {body} = {}) => {
        if(err) {
            callback('Error');
        } else if(body.features.length === 0) {
            callback('No Result');
        } else {
            const latitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            const details = {
                latitude,
                longitude
            }
            callback(undefined, details); 
        } 
    })
}
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=17cb1f138d20b401c9d6febd57d49607&units=f&query=' + latitude + ',' + longitude;
    request({url, json: true}, (err, res) => {
        if(err) {
            callback('Error');
        } else if(res.body.error) {
            callback('API Error');

        } else {
            callback(undefined,`Temperature is ${res.body.current.temperature} ${res.body.current.temperature > 40 ?
            '🌞' : res.body.current.temperature < 20 ? '⛄' : '🌥' }...
            ${res.body.current.weather_descriptions[0]} Its is ${res.body.current.temperature} it feels like ${res.body.current.feelslike}. 
            Humidity is ${res.body.current.humidity}`);
        }
    })  
}
module.exports = {geoCode, forecast};