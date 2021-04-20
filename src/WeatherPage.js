import React, { useState, useEffect } from "react";
import CurrentWeather from './CurrentWeather'
import './App.css';

function WeatherPage() {

    const apiKey = "6b8511b9d8ac9196a8176b71717830cb"       // Have left API key in so it works out of the box but would normally have ENV file
    const [query, setQuery] = useState("");                 // Query is the postcode entered into the input box
    const [weather, setWeather] = useState({});             // Weather data object, set by openweather API call in UseEffect hook
    const [postCodeData, setPostCodeData] = useState({});   // Postcode data object set by postcodes.io API call in search function
    const [coordinates, setCoordinates] = useState({        // Latitiude and longitude coordinates set by postcodes.io API call in search function
        Lat: 0,
        Lng: 0
    });


    // UseEffect hook calls openweather API with latitude and longitude passed in from API call made in search function below

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lng}&units=metric&APPID=${apiKey}`)
            .then((response) => response.json())
            .then((result) => setWeather(result))
    }, [coordinates]);


    // Postcode API call made on hitting enter when postcode typed into input 

    const search = (e) => {
        if (e.key === "Enter") {
            fetch(`https://api.postcodes.io/postcodes/${query}`)
                .then((res) => res.json())
                .then((result) => {
                    if (result.error) {
                        setQuery(result.error)
                    } else {
                        setQuery("");
                        setPostCodeData(result);
                        setCoordinates({
                            lat: result.result.latitude,
                            lng: result.result.longitude
                        });
                    }
                })
        }
    };

    return (
        <div>
            <div className="container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Enter Full Postcode"
                        className="search-bar"
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                <div>
                    {typeof weather !== "undefined" && typeof weather.list !== "undefined" && typeof postCodeData.result !== "undefined" ? <CurrentWeather
                        icon={weather.list[0]["weather"][0]["icon"]}
                        postcode={postCodeData.result.postcode}
                        name={postCodeData.result.admin_ward}
                        country={weather.city.country}
                        temp={Math.round(weather.list[0]["main"]["temp"])}
                        feels={Math.round((weather.list[0]["main"]["feels_like"]))}
                        humidity={(weather.list[0]["main"]["humidity"])}
                        description={(weather.list[0]["weather"][0]["description"])}
                    /> : null}
                </div>

            </div>
        </div>
    );
}

export default WeatherPage;