window.addEventListener('load', function(){

        let long;
        let lat;
        let temperatureDescription = document.querySelector('.temperature-description');
        let temperatureDegree = document.querySelector('.temperature-degree');
        let locationTimezone = document.querySelector('.location-timezone');
        let locationcity = document.querySelector('.location-city');
        let iconElement = document.querySelector(".weather-icon");
        let tempE = document.querySelector(".temperature-value span");
        let tempElement = document.querySelector(".degree-section h2");

        const weather = {};

        weather.temperature = {
         unit : "celsius"
            }

            const KELVIN = 273;


        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;

                const proxy = "http://cors-anywhere.herokuapp.com/";
                const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=13cea4dfe4d2a4d50d0b6c2c5d09f916`;

                fetch(api)
                .then(function (response) {  //response =>
                    return response.json();
                })
                .then(function (response) { //response =>
                     console.log(response);
                     weather.temperature.value = Math.floor(response.main.temp - KELVIN);
                    const name = response.name;//goes into the returned data to get the main section of array
                    const{description, icon} = response.weather[0];
                    const{country} = response.sys;
                    //Set Dom element from the API
                    temperatureDegree.textContent = weather.temperature.value;
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = country;
                    locationcity.textContent = name;
                    iconElement.innerHTML = `<img src="icons/${icon}.png" />`

                });
            });
                
        }


            // C to F conversion
        function celsiusToFahrenheit(temperature){
            return (temperature * 9/5) + 32;
        }

        // WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENT
        tempElement.addEventListener("click", function(){
            if(weather.temperature.value === undefined) return;
            
            if(weather.temperature.unit == "celsius"){
                let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
                fahrenheit = Math.floor(fahrenheit);
                
                tempElement.innerHTML = `${fahrenheit}`;
                tempE.innerHTML = `<span>F</span>`;
                weather.temperature.unit = "fahrenheit";
            }else{
                tempElement.innerHTML = `${weather.temperature.value}`;
                tempE.innerHTML = `<span>C</span>`;
                weather.temperature.unit = "celsius"
            }
        });

});