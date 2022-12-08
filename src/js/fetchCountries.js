import { refs } from './refs.js';
import makeCountriesCard from '../templates/countries-card.hbs';
import makeCountryCard from '../templates/country-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function fetchCountries(evt) {
  let searchName = refs.countrySearchInput.value.trim();
  if (searchName !== '') {
    fetch(`https://restcountries.com/v2/name/${searchName}?fields=flags,name,capital,population,languages
`)
      .then(response => {
        return response.json(); //возвращаем промис с результатом -  массив объектов стран.
      })
      .then(arrayOfCountries => {
        if (arrayOfCountries.length > 10) {
          refs.countryInfoDiv.innerHTML = '';
          refs.countryListUl.innerHTML = '';

          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (
          arrayOfCountries.length >= 2 &&
          arrayOfCountries.length <= 10
        ) {
          refs.countryInfoDiv.innerHTML = '';
          let countriesList = arrayOfCountries.map(makeCountriesCard).join('');
          refs.countryListUl.innerHTML = countriesList;
        } else {
          refs.countryListUl.innerHTML = '';
          let countryItem = arrayOfCountries.map(makeCountryCard).join('');
          let languagesInfoRef = document.createElement('p');
          languagesInfoRef.classList.add('country-list__content');
          let languagesArray = arrayOfCountries[0].languages;
          let languagesContent = languagesArray
            .map((language, index) => {
              if (index === languagesArray.length - 1) {
                return language.name;
              } else {
                return `${language.name}, `;
              }
            })
            .join('');
          languagesInfoRef.textContent = `languages: ${languagesContent}`;
          refs.countryInfoDiv.innerHTML = countryItem;
          refs.countryInfoDiv.append(languagesInfoRef);
        }
      })
      .catch(() => Notify.failure('Oops, there is no country with that name'));
  } else {
    refs.countryInfoDiv.innerHTML = '';
    refs.countryListUl.innerHTML = '';
  }
}

export { fetchCountries };
