const request = require('request')
const forecast = (latitude,longtitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=3f85b91f2e5868c5e13ce52ac0970217&query=' + latitude + ',' + longtitude
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect weather service',undefined)
        }
        else if(response.body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,response.body.current.weather_descriptions[0] + ' It is now ' + response.body.current.temperature + ' deg.')
        }
    })
}

module.exports = forecast