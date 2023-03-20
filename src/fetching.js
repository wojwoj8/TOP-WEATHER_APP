import './style.scss';
import {
  createForm, displayCityData, createDataContainer, createMoreDataContainer, createFooter, createCityAddData,
} from './ui';

console.log('Hello');
// 1fdc7abedf23477ebd14736563f6f941
async function getForecast(name) {
  console.log(name);
  try {
    if (name === undefined || name === '') {
      name = 'Kielce';
    }
    // console.log(cityInput);
    const fetchLink = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1fdc7abedf23477ebd14736563f6f941&q=';
    const response = await fetch(`${fetchLink + name}&units=metric`, { mode: 'cors' });
    if (!response.ok) {
      window.alert('This city doesn\'t exist');
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
  content.appendChild(createCityAddData());
  content.appendChild(createForm());
  content.appendChild(createMoreDataContainer());
  content.appendChild(createFooter());
  getForecast('kielce');

  searchCityListener();

  return content;
}
export { webInit, getForecast, searchCity };
