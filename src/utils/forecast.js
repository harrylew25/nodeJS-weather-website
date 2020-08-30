const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const access_key = process.env.WEATHER_STACK_API_KEY,
        query = `${lat},${long}`,
        units = 'f';
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${query}&units=${units}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Uanble to connect to the server' + error, '');
        }
        if (body.error) {
            const errorBody = response.body.error,
                errorCode = errorBody.type,
                errorInfo = errorBody.info;
            callback(`There is an error: ${errorInfo}`, '');
        }
        const current = body.current,
            humidity = current.humidity || 0,
            temperature = current.temperature || 0,
            feel_like_temperature = current.feelslike || 0;

        callback(undefined, `It's currently ${temperature} degrees out. It feels like ${feel_like_temperature} degrees out. The humidity is ${humidity}`);
    });
}

module.exports = forecast;