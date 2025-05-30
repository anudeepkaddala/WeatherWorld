const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6092c9a83ec0c59fb2e960f133293a35&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search!', undefined);
        } else {
            const data = body.current;
            callback(undefined, {
                temperature: data.temperature,
                precip: data.precip,
                weather_descriptions: data.weather_descriptions[0]
            });
        }
    });
};

module.exports = forecast;