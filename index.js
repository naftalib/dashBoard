//Personal Dashboard App- Google Chrome extension

//Query Selectors

const backgroundImg = document.body.style
const imageAuth = document.getElementById("author")
let obj = {}

//Get background image
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        backgroundImg.backgroundImage = `url(${data.urls.regular})`
		imageAuth.textContent = `- Image by: ${data.user.name} -`
    })
    .catch(err => {
        // Use a default background image/author
        backgroundImg.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
        imageAuth.textContent = `Image by: Dodi Achmad`
    })

//Generate & display the current time
function getCurrentTimeDate() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
    document.getElementById('date').textContent = date.toDateString();
    
}
//call the getTime fn on the second to keep updated acc to seconds
setInterval(getCurrentTimeDate, 1000)

//weather API via geoLocation
navigator.geolocation.getCurrentPosition(position => {
    console.log("location:",position)
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

            document.getElementById("weather-city").innerHTML =`
                <p id="weather-city">${data.name}</p>
            `
            document.getElementById("weather-curr").innerHTML = `
                <img id="weather-icon" src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            `
            document.getElementById('max').textContent=`
            ${Math.round(data.main.temp_max)}º
            `
            document.getElementById('min').textContent=`
            ${Math.round(data.main.temp_min)}º
             `
            document.getElementById('feel').textContent=`
            ${Math.round(data.main.feels_like)}º
             `
            document.getElementById('humid').textContent=`
                ${data.main.humidity}%
            `
        })
        .catch(err => console.error(err))
});

fetch('https://api.exchangerate.host/latest?base=USD')
.then(res=>res.json())
.then(data=>{
    console.log(data)
    const NIS = data.rates.ILS.toFixed(3)
    document.getElementById("currency").textContent = `
        ${NIS}
    `
})
//

console.log("trying out",obj)
