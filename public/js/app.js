// select the form from index.hbs
const weatherForm = document.querySelector("form");
const userLocation = document.querySelector("input");

// Passing the data back to index hbs
const userAddress = document.querySelector("#userAddress");
const userWeather = document.querySelector("#userWeather");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = userLocation.value;

  userAddress.textContent = "Loading data";
  userWeather.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      // Extract the data
      response.json().then((data) => {
        if (data.error) {
          userAddress.textContent = data.error;
        } else {
          userAddress.textContent = data.forecast.location;
          userWeather.textContent =
            "The temperature is currently " +
            data.forecast.temperature +
            " degrees. " +
            data.forecast.conditions;
        }
      });
    }
  );
});
