import _ from 'lodash';
import { getForecast, searchCity } from './fetching';

function createForm() {
  const form = document.createElement('form');
  form.innerHTML = `<input type="text" id="cityInput">
      <button type="button" id="search">Search</button>`;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchCity();
  });
  return form;
}
function clearData() {
  const cityDataContainer = document.querySelector('.cityDataContainer');
  cityDataContainer.innerHTML = '';
  // console.log(cityDataContainer);
}
function createDataContainer() {
  const cityDataContainer = document.createElement('div');
  cityDataContainer.classList = 'cityDataContainer';
  return cityDataContainer;
}
function displayCityData(data) {
  clearData();
  const content = document.querySelector('#content');
  const cityDataContainer = document.querySelector('.cityDataContainer');
  // console.log(cityDataContainer);
  const cityNameDiv = document.createElement('div');
  const weatherDesc = document.createElement('h2');
  weatherDesc.classList = 'weatherDesc';
  const { description } = data.list[0].weather[0];
  weatherDesc.innerHTML = `${_.capitalize(description)}`;

  const weatherImg = document.createElement('img');
  weatherImg.classList = 'weatherImg';
  const img = data.list[0].weather[0].icon;
  weatherImg.src = `https://openweathermap.org/img/wn/${img}@2x.png`;

  cityNameDiv.classList = 'cityNameDiv';
  const cityNameH2 = document.createElement('h2');
  const cityTempDiv = document.createElement('div');
  cityTempDiv.classList = 'cityTempDiv';
  const cityTemp = document.createElement('h2');

  console.log(data.city);
  cityNameH2.innerHTML = `${data.city.name}, ${data.city.country}`;

  const temperature = (data.list[0].main.temp - 273.15).toFixed(1);
  cityTemp.innerHTML = `${temperature} °C`;
  cityTempDiv.appendChild(cityTemp);
  cityNameDiv.appendChild(cityNameH2);
  cityNameDiv.appendChild(weatherDesc);
  cityNameDiv.appendChild(weatherImg);
  cityDataContainer.appendChild(cityNameDiv);
  cityDataContainer.appendChild(cityTempDiv);
  content.appendChild(cityDataContainer);
  return cityDataContainer;
}
export { createForm, displayCityData, createDataContainer };
