import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import FavoriteButton from "./FavoriteButton";

interface CountryCardProps {
  country: {
    name: { common: string };
    capital?: string[];
    population: number;
    flags: { png: string };
    region: string;
    subregion?: string;
    cca3: string; // country code
  };
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        textAlign: "center",
        height: "100%",
      }}
    >
      {/* Flag Image */}
      <CardMedia
        component="img"
        height="140"
        image={country.flags.png}
        alt={`${country.name.common} flag`}
        sx={{ objectFit: "cover", borderBottom: "1px solid #ddd" }}
      />

      {/* Country Details */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {country.name.common}
        </Typography>
        {country.capital && (
          <Typography variant="body2" color="text.secondary">
            Capital: {country.capital.join(", ")}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          Population: {country.population.toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Region: {country.region}
        </Typography>
      </CardContent>

      {/* Actions: View Details & Favorite Button */}
      <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
        <Button
          component={Link}
          to={`/country/${encodeURIComponent(country.name.common)}`}
          variant="contained"
          size="small"
          sx={{ textTransform: "none" }}
        >
          View Details
        </Button>
        <FavoriteButton country={country} />
      </CardActions>
    </Card>
  );
};

export default CountryCard;
