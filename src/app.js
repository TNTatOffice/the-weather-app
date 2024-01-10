const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Defining paths for express config
// Changing the views path to a different directory
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handlebars and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//Set up static directory to serve stylesheet, etc.
app.use(express.static(publicDirectory));

// Rendering the index template from the views folder. In render, first argument is the view to render(page) and the second is an object with the dynamic content
app.get("", (req, res) => {
  res.render("index", {
    title: "Check the weather at your location",
    location: "Tel Aviv",
    name: "Tai",
  });
});

// Setting up about with HBS
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About this Weather App",
    name: "Tai",
  });
});

// Setting up help with HBS
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Tai",
  });
});

// Weather page returning a JSON
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
        });
      });
    }
  );
});

// 404 page for sub pages
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Oops, help article not found!",
  });
});

// 404 page for all pages that can't be found
app.get("*", (req, res) => {
  res.render("404", {
    title: "Oops, page not found!",
  });
});

// Adding a port to kickstart express
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
