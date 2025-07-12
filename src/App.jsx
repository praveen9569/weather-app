import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
import './index.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
      );

      if (!res.ok) throw new Error('City not found');

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

 const getBackgroundClass = () => {
  if (!weather) return 'app-container default';

  const condition = weather.weather[0].main.toLowerCase();

  if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm'))
    return 'app-container rain';
  if (condition.includes('snow'))
    return 'app-container snow';
  if (condition.includes('cloud'))
    return 'app-container clouds';
  if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze'))
    return 'app-container fog';
  if (condition.includes('clear'))
    return 'app-container clear';

  const temp = weather.main.temp;
  if (temp >= 30) return 'app-container hot';
  if (temp <= 10) return 'app-container cold';

  return 'app-container mild';
};



  return (
    <div className={getBackgroundClass()}>
      <div className="content">
        <h2>🌤️ Weather App</h2>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}

export default App;
