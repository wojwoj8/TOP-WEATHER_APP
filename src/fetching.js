import './style.scss';
import { createForm, displayCityData, createDataContainer } from './ui';

console.log('Hello');
// 1fdc7abedf23477ebd14736563f6f941
async function getForecast(name) {
  console.log(name);
  try {
    if (name === undefined) {
      name = 'Kielce';
    }
    // console.log(cityInput);
    const fetchLink = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1fdc7abedf23477ebd14736563f6f941&q=';
    const response = await fetch(fetchLink + name, { mode: 'cors' });
    if (!response.ok) {
      throw new Error('Response status was not ok.');
    }
    const forecastData = await response.json();
    console.log(forecastData);
    displayCityData(forecastData);
    return forecastData;
  } catch (err) {
    console.error(err);
  }
}

function searchCity() {
  const cityElem = document.querySelector('#cityInput');
  const cityName = cityElem.value;
  console.log(cityName);
  getForecast(cityName);
}
function searchCityListener() {
  const button = document.querySelector('#search');
  button.addEventListener('click', searchCity);
}

function webInit() {
  const content = document.querySelector('#content');
  content.appendChild(createDataContainer());
  getForecast('kielce');
  content.appendChild(createForm());
  searchCityListener();

  return content;
}
export { webInit, getForecast, searchCity };
