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
  const cityMoreDataContainer = document.querySelector('.cityMoreDataContainer');
  cityDataContainer.innerHTML = '';
  cityMoreDataContainer.innerHTML = '';
  // console.log(cityDataContainer);
}
function createDataContainer() {
  const cityDataContainer = document.createElement('div');
  cityDataContainer.classList = 'cityDataContainer';
  return cityDataContainer;
}
function createMoreDataContainer() {
  const cityMoreDataContainer = document.createElement('div');
  cityMoreDataContainer.classList = 'cityMoreDataContainer';
  return cityMoreDataContainer;
}
function createFooter() {
  const footer = document.createElement('div');
  footer.classList = 'footer';
  const footerText = document.createElement('p');
  const link = '<a href="https://github.com/wojwoj8">wojwoj8</a>';
  footerText.innerHTML = `Created by ${link}`;
  footer.appendChild(footerText);
  return footer;
}
function displayCityData(data) {
  clearData();
  for (let i = 0; i < 39; i += 8) {
    const content = document.querySelector('#content');
    let cityDataContainer = document.querySelector('.cityDataContainer');
    const cityMoreDataContainer = document.querySelector('.cityMoreDataContainer');
    if (i > 0) {
      cityDataContainer = cityMoreDataContainer;
    }
    const date = document.createElement('p');
    date.classList = 'currentDate';
    date.textContent = `${data.list[i].dt_txt}`;
    // console.log(cityDataContainer);
    const cityDataDiv = document.createElement('div');
    cityDataDiv.dataset.id = i;
    const weatherDesc = document.createElement('h2');
    weatherDesc.classList = 'weatherDesc';
    const { description } = data.list[i].weather[0];
    weatherDesc.innerHTML = `${_.capitalize(description)}`;

    const weatherImg = document.createElement('img');
    weatherImg.classList = 'weatherImg';
    const img = data.list[i].weather[0].icon;
    weatherImg.src = `https://openweathermap.org/img/wn/${img}@2x.png`;

    cityDataDiv.classList = 'cityDataDiv';
    const cityNameH2 = document.createElement('h2');
    const cityTempDiv = document.createElement('div');
    cityTempDiv.classList = 'cityTempDiv';
    const cityTemp = document.createElement('h2');

    console.log(data.city);
    cityNameH2.innerHTML = `${data.city.name}, ${data.city.country}`;

    const temperature = (data.list[i].main.temp - 273.15).toFixed(1);
    cityTemp.innerHTML = `${temperature} °C`;
    cityDataDiv.appendChild(cityNameH2);
    cityDataDiv.appendChild(date);
    cityDataDiv.appendChild(weatherDesc);
    cityDataDiv.appendChild(weatherImg);
    cityDataDiv.appendChild(cityTemp);
    cityDataContainer.appendChild(cityDataDiv);
    cityDataContainer.appendChild(cityTempDiv);
    content.appendChild(cityDataContainer);
  }
}
export {
  createForm, displayCityData, createDataContainer, createMoreDataContainer, createFooter,
};
