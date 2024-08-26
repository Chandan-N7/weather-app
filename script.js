function getWeather() {
    const apiKey = "80c82b6d1e87551de830e461aa2300f3";
    const cityInput = document.getElementById('city');
    const city = cityInput.value.trim();
    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.log('Error fetching current weather data', error);
            alert('Error fetching current weather data');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.log('Error fetching hourly forecast data', error);
            alert('Error fetching hourly forecast data');
        });

    function displayWeather(data) {
        const tempDiv = document.getElementById('temp-dev');
        const weatherInfoDiv = document.getElementById('weather-info');
        const weatherIcon = document.getElementById('weather-icon');
        const hourlyForecastDiv = document.getElementById('hourly-forcast');
        const humidityDev = document.getElementById('humidity');
        const windDev = document.getElementById('wind');
        const detailsDev = document.getElementById('details');

        weatherInfoDiv.innerHTML = '';
        hourlyForecastDiv.innerHTML = '';
        tempDiv.innerHTML = '';
        humidityDev.innerHTML = '';
        windDev.innerHTML = '';

        if (data.cod === '404') {
            weatherInfoDiv.innerHTML = `<p class="message">${data.message}</p>`;
            cityInput.value = '';
            weatherIcon.style.display = 'none';
            detailsDev.style.display = 'none';
            hourlyForecastDiv.style.marginTop = "0"
        } else {
            const cityName = data.name;
            const temperature = Math.round(data.main.temp);
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const wind = data.wind.speed;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

            const temperatureHTML = `<p>${temperature}°C</p>`;
            const weatherHtml = `
                <p>${cityName}</p>
            `;
            const humidityHtml = `
            <p class="humidity">${humidity}%</p>
            <p>Humidity</p>
            `;
            const windHtml = `\
            <p class="wind">${wind}km/h</p>
            <p>Wind Speed</p>\
            `;

            tempDiv.innerHTML = temperatureHTML;
            weatherInfoDiv.innerHTML = weatherHtml;
            weatherIcon.alt = description;
            humidityDev.innerHTML = humidityHtml;
            windDev.innerHTML = windHtml;
            weatherIcon.style.display = 'block';
            detailsDev.style.display = 'flex';
            weatherIcon.src = iconUrl;

        }
    }

    function displayHourlyForecast(hourlyData) {
        const hourlyForecastDiv = document.getElementById('hourly-forcast');
        const next24Hours = hourlyData.slice(0, 9);

        next24Hours.forEach(item => {
            const dateTime = new Date(item.dt * 1000);
            const hour = dateTime.getHours();
            const temperature = Math.round(item.main.temp);
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            const hourlyItemHtml = `
                <div class="hourly-item">
                    <span>${hour}:00</span>
                    <img src="${iconUrl}" alt="Hourly Weather Icon  ">
                    <span>${temperature}°C</span>
                </div>
            `;

            hourlyForecastDiv.innerHTML += hourlyItemHtml;
            hourlyForecastDiv.style.marginTop = "60px"
            cityInput.value = '';
        });
    }

}
