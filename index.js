const container = document.querySelector('.container');
const search = document.querySelector('.search-box');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = 'e3ce646c4d574c11a79203247230811';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no`)
        .then(response => response.json()).then(json => {

        if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.current.condition.text) {
            case 'Sunny':
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            case 'Blowing snow':
            case 'Snow':
                image.src = 'images/snow.png';
                break;
            case 'Partly cloudy':
            case 'Clouds':
                image.src = 'images/cloud.png';
                break;
            case 'Haze':
                image.src = 'images/haze.png';
                break;
            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.current.temp_c)}<span>°C</span>`;
        description.innerHTML = `${json.current.condition.text}`;
        humidity.innerHTML = `${json.current.humidity}%`;
        wind.innerHTML = `${parseInt(json.current.wind_kph)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    })
})