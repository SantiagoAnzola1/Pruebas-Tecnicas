# Challenge Countries API


[x] Create a simple React application that displays a list of countries and their cap: // The application should have the following features:

[x] The list of countries and capitals should be fetched from an API.
[x] The list should be displayed in the `CountriesPage`.
[x] Each country should be displayed in a separate component.
[] The user should be able to filter the list by capital.

const BASE_URL = "https://restcountries.com/v3.1";

To filter by capital city, use the `/capital/{capital}` endpoint. */
  - https://restcountries.com/v3.1/capital/{capital}


`
const FILTERABLE_CAPITALS = [
  "Tallinn",
  "Helsinki",
  "Stockholm", 
  "Oslo",
  "Copenhagen", 
  "Reykjavik",
] as const;

type Capital = (typeof FILTERABLE_CAPITALS) [number];`

`
interface Country {
name: {
common: string;`