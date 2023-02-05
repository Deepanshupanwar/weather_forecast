import "./predicted-weather.css";

const randomweather = ({data}) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
           <br></br>
          <p className="city">Random Forest Regressor</p>
        </div>
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.temp[0])}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label top">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Min Temp</span>
            <span className="parameter-value">{Math.round(data.min_temp[0])}°C</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Max Temp</span>
            <span className="parameter-value">{Math.round(data.max_temp[0])}°C</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{Math.round(data.humidity[0])}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default randomweather;
