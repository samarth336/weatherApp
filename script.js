let city = ""; // Default City
let defcity="Solapur"
let btn = document.querySelector("button");

// On Button Click, Fetch Weather for Input City
btn.addEventListener("click", () => {
    city = document.querySelector("input").value;
    place(city); // Update UI with searched city
    weather();
});

// Update City Name in UI
const place = (cityName) => {
    document.querySelector(".city").innerText = cityName;
};

// Fetch Weather Data
const weather = (latitude = null, longitude = null) => {
    const apiKey = "iHLcjkKYLyL4XlmDRQTV2wnS7njNPDZ3"; // Replace with your Tomorrow.io API Key
    let url = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&units=metric&apikey=${apiKey}`;

    if (latitude && longitude) {
        url = `https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&units=metric&apikey=${apiKey}`;
    }

    fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log(data); // Debugging

            // Extract Weather Data
            const temperature = data.data.values.temperature;
            const humidity = data.data.values.humidity;
            const speed = data.data.values.windSpeed;
            const wdirection = data.data.values.windDirection;
            const visibility = data.data.values.visibility;
            const rainIntensity = data.data.values.rainIntensity;
            const dewPoint = data.data.values.dewPoint;

            // Update UI with Weather Data
            document.querySelector(".numbtemp").innerText = `${temperature}°C`;
            document.querySelector(".Humidityy").innerText = `${humidity}%`;
            document.querySelector(".windspeed").innerText = `${speed}m/s`;
            document.querySelector(".winddir").innerText = `${wdirection}°`;
            document.querySelector(".visibility").innerText = `${visibility}km`;
            document.querySelector(".rain").innerHTML = `<h3 class="rain">${rainIntensity} <span style="font-size:6px;">mm/hr</span></h3>`;
            document.querySelector(".dewpoint").innerText = `${dewPoint}°C`;

        })
        .catch((err) => console.error("Fetch error:", err));
};


// 🆕 Auto Detect User's Location and Update City Name
const getUserLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                // Update UI with Detected City
                console.log(latitude,longitude)
                
                if(latitude==18.5204303 && longitude==73.8567437){
                place(defcity);
                }

                // Fetch Weather for Detected Location
                weather(latitude, longitude);
            },
            (error) => {
                console.error("Geolocation error:", error);
                // weather();    // Fetch Weather for Default City if Permission Denied
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
        // weather(); // Fetch Weather for Default City
    }
};

// 🆕 Live Date & Day Feature
const updateDateTime = () => {
    const now = new Date();
    const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
    document.querySelector("h5").innerText = now.toLocaleDateString("en-US", options);
};

// Call Functions on Page Load
updateDateTime();
getUserLocation();

// Update Date & Time Every Minute
setInterval(updateDateTime, 60000);
