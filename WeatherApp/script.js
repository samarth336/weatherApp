// const data = null;
// document.addEventListener("DOMContentLoaded", () => {
//  let btn = document.querySelector("button");

//  btn.addEventListener("click", () => {
// 	 let city = document.querySelector("input").value.trim();
// 	 if (city) {
// 		 getWeather(city);
// 	 } else {
// 		 alert("Please enter a city name.");
// 	 }
//  });

//  function getWeather(city) {
// 	 const apiKey = "iHLcjkKYLyL4XlmDRQTV2wnS7njNPDZ3"; // Your API key
// 	 const url = `https://api.tomorrow.io/v4/weather/forecast?location=${},-71.0466&apikey=${apiKey}'`;

// 	 fetch(url, {
// 		 method: "GET",
// 		 headers: {
// 			 "x-rapidapi-key": apiKey,
// 			 "x-rapidapi-host": "weather-by-api-ninjas.p.rapidapi.com"
// 		 }
// 	 })
// 	 .then((response) => {
// 		 if (!response.ok) {
// 			 throw new Error(`HTTP error! Status: ${response.status}`);
// 		 }
// 		 return response.json();
// 	 })
// 	 .then((data) => {
// 		 console.log("Weather Data:", data);

// 		 if (data.temp !== undefined) {
// 			 document.getElementById("numbtemp").innerText = `${data.temp}°C`;
// 			 document.querySelector(".city").innerText = city;
// 			 document.querySelector(".Humidityy").innerText = `${data.humidity}%`;
// 			 document.querySelector(".wind p").innerText = `${data.wind_speed} m/s`;
			 
// 			 // Set the current date
// 			 let currentDate = new Date();
// 			 document.querySelector(".location_data h5").innerText = currentDate.toDateString();
// 		 } else {
// 			 alert("Weather data not found for this city.");
// 		 }
// 	 })
// 	 .catch((error) => {
// 		 console.error("Fetch error:", error);
// 		 alert("Failed to fetch weather data. Please check the city name.");
// 	 });
//  }

//  // Load default city weather on page load
//  getWeather("Solapur");
// });


// const options = {
// 	method: 'GET',
// 	headers: {accept: 'application/json', 'accept-encoding': 'deflate, gzip, br'}
//   };
  
//   fetch('https://api.tomorrow.io/v4/weather/realtime?location=solapur&apikey=iHLcjkKYLyL4XlmDRQTV2wnS7njNPDZ3', options)
// 	.then(res => res.json())
// 	.then(res => console.log(res))
// 	.catch(err => console.error(err));


let city = "Solapur";

let btn = document.querySelector("button");
btn.addEventListener('click', () => {
    city = document.querySelector("input").value;
	place()
    // weather();
})

place=()=>{
	document.querySelector("h4").innerText = `${city}`;
};


weather = () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'accept-encoding': 'deflate, gzip, br',
        },
    };

    fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${city}&units=metric&apikey=`,
        options
    )
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            // Access the temperature value
            console.log(data);
            const temperature = data.data.values.temperature;
            const humidity = data.data.values.humidity;
            const speed = data.data.values.windSpeed;
			const wdirection = data.data.values.windDirection;
			const visibility = data.data.values.visibility;
			const rainIntensity = data.data.values.rainIntensity;
			const dewPoint = data.data.values.dewPoint;
            document.querySelector(".numbtemp").innerText = `${temperature}°C`;
            document.querySelector(".Humidityy").innerText = `${humidity}%`;
            document.querySelector(".windspeed").innerText = `${speed}m/s`;
            document.querySelector(".winddir").innerText = `${wdirection}°`;
            document.querySelector(".visibility").innerText = `${visibility}km `;
			document.querySelector(".rain").innerHTML = `<h3 class="rain">${rainIntensity} <span style="font-size:6px;">mm/hr</span></h3>`;
            document.querySelector(".dewpoint").innerText = `${dewPoint}°C`;

        })
        .catch((err) => console.error('Fetch error:', err));
}