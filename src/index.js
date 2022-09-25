import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
searchBox: document.querySelector('#search-box'),
countryList: document.querySelector('.country-list'),
countryInfo: document.querySelector('.country-info'),
};


const markupEL = refs => (refs.innerHTML = '');

const onCouttres = evn =>  {
    const inputEL = evn.target.value.trim();
    if (!inputEL) {
        markupEL(refs.countryList);
        markupEL(refs.countryInfo);
        return;
    } else {
        fetchCountries(inputEL)
        .then(data => {
            console.log(data);
            if (Number(data.length > 10)) {
                Notify.info(
                    'Too many matches found. Please enter a more specific name.'
                );
                return;
            }
        countryMarup(data);
        })

        .catch(err => {
            markupEL(refs.countryInfo);
            markupEL(refs.countryList);
            Notify.failure('Oops, there is no country with that name');
        });
    }
};

const countryMarup = data => { 
    if (Number(data.length > 1)) {
        markupEl(refs.countryList);
        const infoEl = infoMarkup(data);
        refs.countryInfo.innerHTML = infoEl;
    } else {
        markupEl(refs.countryInfo);
        const listEl = listMarkup(data);
        refs.countryList.innerHTML = listEl;
    }
  }

const listMarkup = data => {
    return data
      .map(
        ({ name, flags }) =>
        `<li class="country-list__item">
        <img class="country-list__image" src="${flags.svg}" alt="${name.official}" width="30">
        <span class="country-list__name" >${name.official}</span>
        </li>`
      )
      .join('');
  };

  const infoMarkup = data => {
    return data.map(
      ({ name, capital, population, flags, languages }) =>
        `<img class="country-info__image" src="${flags.svg}" alt="${name.official}" width="100" height="70">
        <h1 class="country-info__name">${name.official}</h1>
        <p class="country-info__feature-caption">Capital: ${capital}</p>
        <p class="country-info__feature-caption">Population: ${population}</p>
        <p class="country-info__feature-caption">Languages: ${Object.values(languages)}</p>`
    );
  };


  refs.searchBox.addEventListener('input', debounce(onCouttres, DEBOUNCE_DELAY));