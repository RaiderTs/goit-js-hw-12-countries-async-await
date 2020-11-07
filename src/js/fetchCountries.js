const BASE_URL = "https://restcountries.eu/rest/v2/name";

// function fetchCountry(searchQuery) {
//   return fetch(`${BASE_URL}/${searchQuery}`).then((response) =>
//     response.json()
//   );
// }
// export default { fetchCountry };


async function fetchCountry(searchQuery) {
  const response = await fetch(`${BASE_URL}/${searchQuery}`);
  return await response.json();
}

export default { fetchCountry };
