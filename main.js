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

const petsArea = async (url) => {
  const pets = await fetch(url);
  const petsData = await pets.json();

  petsData.forEach((pet) => {
    console.log(pet.name);
  });
};

petsArea("https://learnwebcode.github.io/bootcamp-pet-data/pets.json");
