import '../css/styles.css';
import { refs } from './refs.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 500;

// refs.countrySearchInput.addEventListener('input', () => {
//   let searchName = refs.countrySearchInput.value;
//   fetchCountries(searchName);
// });
refs.countrySearchInput.addEventListener(
  'input',
  debounce(fetchCountries, DEBOUNCE_DELAY)
);

// console.log(refs);
// Notify.success('Sol lucet omnibus');

// Notify.success('Click Me', {
//   timeout: 20000,
// });
// console.log(refs.countrySearchInput);
// console.log(refs.countryListUl);
// console.log(refs.countryListUl);
function fetchCountries(evt) {
  let searchName = refs.countrySearchInput.value;
  fetch(`https://restcountries.com/v2/name/${searchName}?fields=name,capital,population,languages,flags
`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const b = data[0].flags.svg;
      //   const c = data[0].population;
      // console.log(b);

      let s = document.createElement('img');
      s.setAttribute('src', `${b}`);
      refs.countryInfoDiv.append(s);

      // const b = data[0];
      //   refs.countryInfoDiv.textContent = c;
    });
}
