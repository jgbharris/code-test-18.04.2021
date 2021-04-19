import './App.css';


function CurrentWeather(props) {
    return (
        <div>
            <div className="location-container">
            <div className="temperature">{props.temp}°C</div>
                <div>
                    <img alt="icon" src={
                        props.icon
                            ? `http://openweathermap.org/img/wn/${props.icon}@4x.png`
                            : null
                    } />
                </div>
                <div className="location">
                    {props.postcode}, {props.country}
                </div>
                <div className="date"> {props.date}</div>
            </div>
            <div className="weather-container">
              
                <div className="weather">Feels like: {props.feels}°C</div>
                <div className="weather">Humidity: {props.humidity}%</div>
                <div className="weather">Description: {props.description}</div>
            </div>
        </div>
    )
}

export default CurrentWeather;