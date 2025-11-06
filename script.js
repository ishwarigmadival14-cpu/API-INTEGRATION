async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const apiKey = "1db9e0e774fe46ee7a52422e39230619"; // Replace with your OpenWeatherMap API key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid=${apiKey}`;

   // try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod !== 200) {
            alert("City not found.");
            return;
        }

        const { main, weather, wind, name, coord } = weatherData;
        document.getElementById("temp-div").innerText = `Temperature: ${main.temp}°C`;
        document.getElementById("Weather-info").innerText = `Condition: ${weather[0].description}, Wind: ${wind.speed} m/s`;
        document.getElementById("Weather-icon").src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

        const airResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`
        );
        const airData = await airResponse.json();
        const aqi = airData.list[0].main.aqi;
        document.getElementById("Air-quality").innerText = `Air Quality Index: ${aqi}`;

        // Optional: Add hourly forecast using One Call API if needed
    } 
    //catch (error)
     {
        console.error("Error fetching weather data:", error);
        alert("Something went wrong. Please try again.");
  //  }
}
