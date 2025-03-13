import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchAllCountries,
  selectAllCountries,
  selectCountriesLoading,
  selectCountriesError,
} from "../store/slices/countriesSlice";
import CountryCard from "./CountryCard";
import { Country } from "../types/country"; // Adjust the import path as necessary
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputAdornment,
  Chip,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);
  const loading = useAppSelector(selectCountriesLoading);
  const error = useAppSelector(selectCountriesError);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountry, setFilteredCountry] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchAllCountries());
    }
  }, [dispatch, countries.length]);

  useEffect(() => {
    const lowerCasedSearchTerm = searchTerm.toLowerCase();
    const filtered = countries.filter(
      (country) =>
        country.region.toLowerCase().includes(lowerCasedSearchTerm) ||
        country.cca3.toLowerCase().includes(lowerCasedSearchTerm)
    );
    setFilteredCountry(filtered);
  }, [searchTerm, countries]);

  useEffect(() => {
    let result = countries;

    if (searchTerm) {
      result = result.filter(
        (country) =>
          country.name.common
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (country.capital &&
            country.capital[0]
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedRegion) {
      result = result.filter((country) => country.region === selectedRegion);
    }

    setFilteredCountry(result);
  }, [countries, searchTerm, selectedRegion]);

  // Get unique regions for filter dropdown
  const regions = [
    ...new Set(countries.map((country) => country.region)),
  ].sort();

  const handleRegionChange = (event: SelectChangeEvent<string>) => {
    setSelectedRegion(event.target.value);
  };
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedRegion("");
  };

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
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search countries by name or cca3 code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel id="region-select-label">Filter by Region</InputLabel>
          <Select
            labelId="region-select-label"
            value={selectedRegion}
            onChange={handleRegionChange}
            label="Filter by Region"
            startAdornment={
              <InputAdornment position="start">
                <FilterListIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="">
              <em>All Regions</em>
            </MenuItem>
            {regions.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {(searchTerm || selectedRegion) && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2">Active filters:</Typography>
          {searchTerm && (
            <Chip
              label={`Search: ${searchTerm}`}
              onDelete={() => setSearchTerm("")}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          {selectedRegion && (
            <Chip
              label={`Region: ${selectedRegion}`}
              onDelete={() => setSelectedRegion("")}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          <Chip
            label="Clear all"
            onClick={clearFilters}
            size="small"
            color="secondary"
          />
        </Box>
      )}

      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        Countries
      </Typography>

      <Grid container spacing={3}>
        {filteredCountry.map((country, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
            <CountryCard country={country} key={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CountriesList;
