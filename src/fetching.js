import './style.css';

function createForm() {
  const form = document.createElement('form');
  form.innerHTML = `<input type="text" id="cityInput">
    <button type="button" id="search">Search</button>`;
  return form;
}

console.log('Hello');
// 1fdc7abedf23477ebd14736563f6f941
async function getForecast() {
  try {
    const cityElem = document.querySelector('#cityInput');
    const cityInput = cityElem.value;
    // console.log(cityInput);
    const fetchLink = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1fdc7abedf23477ebd14736563f6f941&q=';
    const response = await fetch(fetchLink + cityInput, { mode: 'cors' });
    if (!response.ok) {
      throw new Error('Response status was not ok.');
    }
    const forecastData = await response.json();
    console.log(forecastData);
  } catch (err) {
    console.error(err);
  }
}

function searchCity() {
  const button = document.querySelector('#search');
  button.addEventListener('click', getForecast);
}

function webInit() {
  const content = document.querySelector('#content');
  content.appendChild(createForm());
  searchCity();

  return content;
}
export default webInit;
