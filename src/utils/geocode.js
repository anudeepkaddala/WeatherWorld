const request= require('request');
const geocode = (address, callback) => {
    const url = `http://api.opencagedata.com/geocode/v1/json?key=9cc9d10d914a405f8705a8307f6ca305&q=${encodeURIComponent(address)}&pretty=1&no_annotations=1`;
    
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to geocode service!', undefined);
        } else if (body.results.length === 0) {
            callback('No results found for the given address.', undefined);
        } else {
            const data = body.results[0];
            const latitude = data.geometry.lat;
            const longitude = data.geometry.lng;
            const formattedAddress = data.formatted;
            callback(undefined, { formattedAddress, latitude, longitude });
        }
    });
};

module.exports = geocode;