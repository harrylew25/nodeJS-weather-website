const request = require('postman-request');

const geocode = (address, callback) => {
    const access_token = process.env.MAPBOX_API_KEY;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${access_token}&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the server', undefined);
            return;
        } else if (!body.features || body.features.length === 0) {
            callback('Unable to find the location', undefined);
            return;
        }
        callback(undefined, {
            lat: body.features[0].center[1],
            long: body.features[0].center[0],
            location: body.features[0].place_name
        })
    });
};

module.exports = geocode;