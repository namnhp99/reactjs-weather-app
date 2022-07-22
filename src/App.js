import React from 'react'
import { useState } from 'react'
import './App.css'

function App() {

  const apiKey = '6d19519bc92968adcd18577ee1142022'
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState('')

  const getWeather = (event) => {
    if (event.key === 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data)
          setCity('')
        })
    }
  }

  return (
    <div className='container'>
      <input
        className='input' placeholder='Enter City...'
        onChange={e => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />

      {typeof weatherData.main === 'undefined' ? (
        <div>
          <p className='welcome'>Enter in a city to get the weather of.</p>
        </div>
      ) : (

        <div className='glass'>
          <div className='weather-data'>
            <p className='city'>{weatherData.name}</p>
            <p className='temp'>{Math.round(weatherData.main.temp)}°C</p>

          </div>
          <div className='weather-box'>
            <p className='weather'>{weatherData.weather[0].main}</p>
            <p className='weather'>Feels like {Math.round(weatherData.main.feels_like)}°C</p>

          </div>
        </div>
      )}

      {weatherData.cod === '404' ? (

        <div>
          <p className='error'>City not found ‼ ❌ 😭  </p>
          <h2>Please enter right city's name</h2>
        </div>

      ) : (
        <></>
      )}





    </div>
  )
}

export default App

