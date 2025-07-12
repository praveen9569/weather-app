import React from 'react';

const WeatherCard = ({ weather }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="card">
      <h3>{weather.name}</h3>
      <img src={iconUrl} alt="icon" />
      <p><strong>{weather.weather[0].description}</strong></p>
      <p>🌡️ Temp: {weather.main.temp}°C</p>
      <p>💨 Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;
