import "./css/common.css";
import countryСard from "./templates/countries.hbs";
import countryList from "./templates/countriesList.hbs";
import API from "./js/fetchCountries"; // работа с бэкендом
import getRefs from "./js/get-refs"; // получение рефов
import "./js/pnotify";
import { error } from "@pnotify/core";

const debounce = require("lodash.debounce");

const refs = getRefs();

// refs.input.value = '' ;
refs.input.addEventListener("input", debounce(onSearch, 500));

async function onSearch(event) {
  try {
    event.preventDefault();
    refs.cardContainer.innerHTML = "";
    const searchQuery = refs.input.value;
    if (!searchQuery) return;
    const data = await API.fetchCountry(searchQuery);
    onFetchSuccess(data);
  } catch (error) {
    onFetchError(error);
  }
  // .finally(() => form.reset());
}


// Функция без async
// function onSearch(event) {   
//   event.preventDefault();
//   refs.cardContainer.innerHTML = "";
//   const searchQuery = refs.input.value;
//   if (!searchQuery) return;
//   API.fetchCountry(searchQuery).then(onFetchSuccess).catch(onFetchError);
//   // .finally(() => form.reset());
// }

function onFetchSuccess(data) {
  if (data.length === 1) {
    renderCountryCard(data);
    return;
  } else if (data.length <= 10 && data.length > 1) {
    renderCountryList(data);
    return;
  } else  {
    error("Please enter a more specific query!");
  }

}

function renderCountryCard(country) {
  const markup = countryСard(country);
  refs.cardContainer.innerHTML = markup;
}

function renderCountryList(list) {
  const markup = countryList(list);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  console.log(error);
}
