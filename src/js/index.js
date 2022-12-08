import { refs } from './refs.js';
import { fetchCountries } from './fetchCountries.js';
import '../css/styles.css';
import debounce from 'lodash.debounce';
// import makeCountriesCard from '../templates/countries-card.hbs';
// import makeCountryCard from '../templates/country-card.hbs';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 500;

refs.countrySearchInput.addEventListener(
  'input',
  debounce(fetchCountries, DEBOUNCE_DELAY)
);
