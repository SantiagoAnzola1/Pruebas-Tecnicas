import type { Country } from '../types'
function CountryElement({ countryProp }: { countryProp: Country }) {
  return (
    <li>
      {countryProp.name.common}, {countryProp.capital}
    </li>
  )
}
function ListCountries({ listCountries }: { listCountries: Country[] }) {
  return (
    <ul key={crypto.randomUUID()}>
      {
        listCountries.map((country) => {
          return (
            <CountryElement key={country.name.common} countryProp={country} />
          )
        })
      }

    </ul>
  )
}

export default ListCountries