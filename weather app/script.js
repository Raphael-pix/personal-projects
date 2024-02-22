const searchInput = document.querySelector(".search-section input")
const search = document.querySelector(".search-icon")
const heroImg =  document.querySelector(".weather-img")
const body =  document.querySelector(".container-body")
console.log(body)


/*
scripting for forecast section
const arrow = document.querySelector(".arrow")
const forecast = document.querySelector(".forecast")
arrow.addEventListener("click",()=>{
    forecast.classList.toggle("show")
    forecast.classList.contains("show") ? arrow.querySelector("img").src = "images/ep--arrow-up-bold.svg" : arrow.querySelector("img").src = "images/ep--arrow-down-bold.svg"
})
*/

async function  checkWeather(loc){
    const apiUrl = "https://api.weatherapi.com/v1/current.json";
    const apiKey = "0c6289cb080949428e145321241202";
    let response = await fetch( apiUrl + `?key=${apiKey}&q=${loc}`,{mode:"cors"})
    let data = await response.json()

    document.querySelector(".temp").innerHTML = Math.floor(data.current.temp_c )+ "°c"
    document.querySelector(".location").innerHTML = data.location.name
    document.querySelector(".humidity-value").innerHTML = data.current.humidity + "%"
    document.querySelector(".wind-speed-value").innerHTML = data.current.wind_kph + "km/h"

    heroImg.src = data.current.condition.icon
       
}
search.addEventListener("click", async ()=>{
    await checkWeather(searchInput.value)
    body.style.display ="block"
})