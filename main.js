const temperatureElement = document.querySelector("#temperature");

start = async () => {
  const weatherPromise = await fetch(
    "https://api.weather.gov/gridpoints/MFL/110,50/forecast"
  );

  try {
    const weatherData = await weatherPromise.json();
    const temperature = weatherData.properties.periods[0].temperature;

    temperatureElement.textContent = temperature;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

start();
