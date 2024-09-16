const temperatureElement = document.querySelector("#temperature");
const template = document.querySelector("#pet-card-template");
const wrapper = document.createDocumentFragment();
const listOfPets = document.querySelector(".list-of-pets");

const creatAgeText = (birthYear) => {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  if (age === 1) return "1 year old";
  if (age === 0) return "less than a year old";

  return `${age} years old`;
};

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
    clone.querySelector(".pet-description").textContent = pet.description;
    clone.querySelector(".pet-age").textContent = creatAgeText(pet.birthYear);
    clone.querySelector(".pet-card-photo img").src = pet.photo
      ? pet.photo
      : "https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg";
    clone.querySelector(".pet-card-photo img").alt =
      `This is a picture of a ${pet.species} named ${pet.name}`;
    wrapper.appendChild(clone);
  });

  listOfPets.appendChild(wrapper);
};

petsArea("https://learnwebcode.github.io/bootcamp-pet-data/pets.json");
