import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchAllCountries,
  selectAllCountries,
  selectCountriesLoading,
  selectCountriesError,
} from "../store/slices/countriesSlice";
import CountryCard from "./CountryCard";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);
  const loading = useAppSelector(selectCountriesLoading);
  const error = useAppSelector(selectCountriesError);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchAllCountries());
    }
  }, [dispatch, countries.length]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Countries</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountriesList;
