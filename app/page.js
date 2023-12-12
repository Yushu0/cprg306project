"use client";

import Image from "next/image";
import styles from "./page.module.css";
import search from "./assets/search.svg";
import { useEffect, useState } from "react";

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '86635fd29966e41830e4cc8e9670aa79';
const UNITS = 'metric';

const WeatherInfo = ({ data }) => (
  <div className={styles.weather}>
    {data.name && <p>City: {data.name}</p>}
    {data.main && <p>Temperature: {data.main.temp}</p>}
    {data.main && <p>Pressure: {data.main.pressure}</p>}
    {data.main && <p>Humidity: {data.main.humidity}</p>}
    {data.wind && <p>Wind Speed: {data.wind.speed}</p>}
  </div>
);

const SearchForm = ({ onChange, onSubmit }) => (
  <div className={styles.search}>
    <input
      className={styles.search_bar}
      placeholder="Search your city name"
      onChange={onChange}
    />
    <button onClick={onSubmit}>
      <Image src={search} alt="search" width={24} height={24} />
    </button>
  </div>
);

export default function Home() {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=${UNITS}`
      );
      const weatherData = await response.json();
      setData(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <SearchForm onChange={handleChange} onSubmit={handleSubmit} />
        <WeatherInfo data={data} />
      </div>
    </main>
  );
}
