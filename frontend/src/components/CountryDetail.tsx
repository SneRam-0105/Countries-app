import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchAllCountries,
  selectAllCountries,
  selectCountriesLoading,
  selectCountriesError,
} from "../store/slices/countriesSlice";
import WeatherInfo from "./WeatherCard"; // Import WeatherInfo
import { weatherApi } from "../api/services/weather";
import { WeatherData } from "../types/weather";

const CountryDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);
  const loading = useAppSelector(selectCountriesLoading);
  const error = useAppSelector(selectCountriesError);

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const country = countries.find(
    (country) => country.name.common.toLowerCase() === name?.toLowerCase()
  );

  useEffect(() => {
    if (!country) {
      dispatch(fetchAllCountries());
    }
  }, [country, dispatch]);

  useEffect(() => {
    if (country?.capital) {
      const fetchWeather = async () => {
        setWeatherLoading(true);
        try {
          const response = await weatherApi.getWeatherByCity(
            country.capital?.[0] || ""
          );
          setWeatherData(response.data);
        } catch {
          setWeatherError("Could not fetch weather data");
        } finally {
          setWeatherLoading(false);
        }
      };

      fetchWeather();
    }
  }, [country]);

  if (loading) return <h3>Loading country details... </h3>;
  if (error) return <h3>{error}</h3>;
  if (!country) return <h3>Country not found. Please try again.</h3>;

  return (
    <>
      <div className="country-detail">
        <h1>{country.name.common}</h1>
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
        <p>Capital: {country.capital?.[0] || "N/A"}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
        <p>Subregion: {country.subregion}</p>
      </div>

      {/* Weather Info Component */}
      <WeatherInfo
        weatherData={weatherData}
        loading={weatherLoading}
        error={weatherError}
      />
    </>
  );
};

export default CountryDetail;
