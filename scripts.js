function getWeather() {
    const apiKey = 'API KEY';
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=imperial&appid=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        alert(`Error fetching weather data for "${city}." Please try again.`);
    });
}

function displayWeather(data) {
    const {name} = data; 
    const {icon, description} = data.weather[0];
    const {temp, feels_like, temp_min, temp_max, humidity} = data.main;
    const {speed} = data.wind;

    document.querySelector('.container').classList.remove('loading');
    document.getElementById('location').innerText = `Weather in ${name}`;
    document.getElementById('temperature').innerText = `${temp}°F`;
    document.getElementById('feels').innerText = `Feels like: ${feels_like}°F`;
    document.getElementById('icon').src = "https://openweathermap.org/img/wn/"+ icon + ".png";
    document.getElementById('description').innerText = description;
    document.getElementById('high').innerText = `High: ${temp_max}°F`;
    document.getElementById('low').innerText = `Low: ${temp_min}°F`;
    document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
    document.getElementById('wind').innerText = `Wind: ${speed}mph`;

    setBackgroundImage(name);

    let millisecondDelay = 300;
    setTimeout( () => {
        let weatherInfo = document.querySelector('.weatherInfo');
        weatherInfo.style.display = "auto";
        weatherInfo.style.transition = "opacity 2s";
        weatherInfo.style.opacity = 1;    
    }, millisecondDelay);
}

function setBackgroundImage(name) {
    const apiKey = 'API KEY'
    const engineID = 'SEARCH ENGINE ID'
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${engineID}&q=${encodeURIComponent(`${name} city`)}&searchType=image&num=1`;

    fetch(url)
        .then(response =>response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const imageURL = data.items[0].link;
                document.body.style.backgroundImage = `url(${imageURL})`;
                document.body.style.backgroundSize = 'cover';
            } else {
                console.error(`No image found for the city ${name}.`)
            }
        })
        .catch(error => {
            console.error('Error fetching image data:', error);
        });
}