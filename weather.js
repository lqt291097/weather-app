const $ = document.querySelector.bind(document);
const apiKey = "186ad1ca217ff1c973911ec50f48ba78";
const weatherDataEl = $("#weather-data");

const cityInputEl = $("#city-input");

const formEl = $("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});
async function getWeatherData(cityValue) {
    try {
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        console.log(icon);
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${Math.round(data.main.humidity)}`,
            `Wind speed: ${data.wind.speed}`,
        ];
        $(
            ".icon"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        $(".temperature").innerText = `${temperature} °C`;
        $(".description").innerText = description;
        const htmls = details
            .map(
                (detail) => `
            <div>${detail}</div>
        `
            )
            .join();
        $(".details").innerHTML = htmls;
    } catch (error) {
        $(".icon").innerHTML = "";
        $(".temperature").innerText = "";
        $(".description").innerText =
            "An error happened, please try again later";
        $(".details").innerHTML = "";
    }
}
