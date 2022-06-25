import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("input#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

input.addEventListener("input", debounce(onInputTape), DEBOUNCE_DELAY);

function onInputTape(event) {
    event.preventDefault();
    
    countryList.innerHTML = '';

    const valueInput = input.value.trim();
    console.log(valueInput);

    fetchCountries(valueInput).then(countries => {
        // console.log(countryInfo.innerHTML = buildCountryMarkup(countries)));
    
        const countryLength = countries.length;

        if (countryLength === 1) {
            console.log(countries);
            countryInfo.innerHTML = buildCountryMarkup(countries);
        } else if (countryLength > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        } else {
            countryList.innerHTML = buildCountryList(countries);
        }
    })
        .catch(error => Notiflix.Notify.failure("Oops, there is no country with that name"));
}


function buildCountryList(countries) {
    return countries.map(country => `<li>
        <img src=${country.flags.svg} alt = "${country.name.common}"height=12/>
        <span>${country.name.official}</span>
        </li>`).join('');
}

function buildCountryMarkup(countries) {
    return countries.map(country =>
            `<ul>
        <li class="country-list-header">
        <img class="country-list-img" src=${country.flags.svg} height=18/>
        <span class="country-title">${country.name.official}</span>
        </li>
        <li class="country-list-item">
        <span class="country-name-inform">Capital: </span><span class="country-definition">${country.capital}</span>
        </li>
        <li class="country-list-item">
        <span class="country-name-inform">Population: </span><span class="country-definition">${country.population}</li>
        <li class="country-list-item">
        <span class="country-name-inform">Languages: </span><span class="country-definition"> ${Object.values(country.languages).join(', ')}</span>
        </li>
            </ul>`).join("");
}        