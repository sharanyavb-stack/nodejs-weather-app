const http = require('http');
const url = 'http://api.weatherstack.com/current?access_key=17cb1f138d20b401c9d6febd57d49607&units=f&query=40,-75';
const request = http.request(url, (res)=> {
    let data = '';
    res.on('data', (chunck) => {
        data = data + chunck.toString();
    })
    res.on('end', () => {
        const body = JSON.parse(data)
    } )
})
request.on('error', (error) => {
    console.log(error);
})
request.end();