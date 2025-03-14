import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

// MUI Components
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";

const CountryDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);
  const loading = useAppSelector(selectCountriesLoading);
  const error = useAppSelector(selectCountriesError);
  const navigate = useNavigate();

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
          console.log(response);
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

  if (loading)
    return <Typography variant="h5">Loading country details...</Typography>;
  if (error)
    return (
      <Typography variant="h5" color="error">
        {error}
      </Typography>
    );
  if (!country)
    return (
      <Typography variant="h5">Country not found. Please try again.</Typography>
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      {/* Country Details Card */}
      <Card sx={{ maxWidth: 500, textAlign: "center", mb: 4 }}>
        <CardMedia
          component="img"
          height="200"
          image={country.flags.png}
          alt={`${country.name.common} flag`}
        />
        <CardContent>
          <Typography variant="h4">{country.name.common}</Typography>
          <Typography variant="body1">
            Capital: {country.capital?.[0] || "N/A"}
          </Typography>
          <Typography variant="body1">
            Population: {country.population.toLocaleString()}
          </Typography>
          <Typography variant="body1">Region: {country.region}</Typography>
          <Typography variant="body1">
            Subregion: {country.subregion}
          </Typography>
        </CardContent>
      </Card>

      {/* Weather Info Component */}
      <WeatherInfo
        weatherData={weatherData}
        loading={weatherLoading}
        error={weatherError}
      />

      <Button
        onClick={() => navigate("/countries")}
        sx={{
          mb: 4,
          backgroundColor: (theme) => theme.palette.secondary.main,
        }}
      >
        Back To Countries
      </Button>
    </Box>
  );
};

export default CountryDetail;
