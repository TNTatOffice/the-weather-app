const request = require("postman-request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=dcf51de708ad50e2b45dfe25280046a4&query=" +
    longitude +
    "," +
    latitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to gather weather data", undefined);
    } else {
      callback(undefined, {
        location: body.location.name,
        temperature: body.current.temperature,
        conditions: body.current.weather_descriptions[0],
      });
    }
  });
};

module.exports = forecast;
