const request = require('request')
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoibWFobW91ZC1hbGFiYWR5IiwiYSI6ImNrdnMyN3YzMDFwN2gydnFoMW5iaTg3cXoifQ.A0i_WbAr8VjUrjkiUUnEoQ";

  request({ url, json: true }, (error, response) => {
    if (error) {
        callback('Unable to connect to location service',undefined)
    } 
    else if (response.body.message) {
      callback(response.body.message , undefined)
    } 
    else if (response.body.features.length === 0) {
     callback('Unable to find location.. Try again',undefined)
    } 
    else {
       callback(undefined,{
        longtitude:response.body.features[0].center[0],
        latitude:response.body.features[0].center[1],
        location: response.body.features[0].place_name
       }) 
    }
  });
};

module.exports = geocode