import React from "react";
import { Link } from "react-router-dom";

interface CountryCardProps {
  country: {
    name: { common: string };
    capital?: string[];
    population: number;
    flags: { png: string };
    region: string;
    subregion: string;
  };
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <div className="country-card border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        className="w-full h-32 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-2">{country.name.common}</h2>

      {/* View Details button which routes to the country details page */}
      <Link
        to={`/country/${encodeURIComponent(country.name.common)}`}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  );
};

export default CountryCard;
