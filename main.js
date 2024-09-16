const temperatureElement = document.querySelector("#temperature");
const template = document.querySelector("#pet-card-template");
const wrapper = document.createDocumentFragment();
const listOfPets = document.querySelector(".list-of-pets");

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

  console.log(petsData);

  petsData.forEach((pet) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("h3").textContent = pet.name;
    wrapper.appendChild(clone);
  });

  listOfPets.appendChild(wrapper);
};

petsArea("https://learnwebcode.github.io/bootcamp-pet-data/pets.json");
