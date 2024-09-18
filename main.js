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

  petsData.forEach((pet) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".pet-card").dataset.species = pet.species;
    clone.querySelector("h3").textContent = pet.name;
    clone.querySelector(".pet-description").textContent = pet.description;
    clone.querySelector(".pet-age").textContent = creatAgeText(pet.birthYear);
    clone.querySelector(".pet-card-photo img").src = pet.photo
      ? pet.photo
      : "./images/fallback.jpg";
    clone.querySelector(".pet-card-photo img").alt =
      `This is a picture of a ${pet.species} named ${pet.name}`;
    wrapper.appendChild(clone);
  });

  listOfPets.appendChild(wrapper);
};

petsArea("https://learnwebcode.github.io/bootcamp-pet-data/pets.json");

//Pet Filter Button

const filterBtns = document.querySelectorAll(".pet-filter button");

const handleButtonClick = function (event) {
  //Remove .active class from any and all buttons
  filterBtns.forEach((btn) => {
    btn.classList.remove("active");
  });

  //Add .active class to the specific button that was clicked
  event.target.classList.add("active");

  //Filter the pets
  // console.log(event.target.attributes["data-filter"].value);
  const currentFilter = event.target.dataset.filter;
  const petCards = document.querySelectorAll(".pet-card");

  petCards.forEach((petCard) => {
    if (currentFilter === petCard.dataset.species || currentFilter === "all") {
      petCard.style.display = "grid";
    } else {
      petCard.style.display = "none";
    }
  });
};

filterBtns.forEach((btn) => {
  btn.addEventListener("click", handleButtonClick);
});
