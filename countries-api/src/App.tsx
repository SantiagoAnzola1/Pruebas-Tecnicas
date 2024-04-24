import { useEffect, useState } from 'react'
import { FILTERABLE_CAPITALS, Country, Capital } from './types'
import './App.css'
import ListCountries from './components/ListCountries'

function App() {
  const [countries, setCountries] = useState<Country[]>([])
  const [filterCapital, setFilterCapital] = useState<Capital | undefined>()
  const BASE_URL = 'https://restcountries.com/v3.1'

  useEffect(() => {
    const fectchData = async () => {
      const url = filterCapital != undefined ? `${BASE_URL}/capital/${filterCapital}` : `${BASE_URL}/all`
      const respose = await fetch(url)
      const jsonResponse = await respose.json()
      setCountries(jsonResponse)
    }
    fectchData()
      .catch(error => console.error(error))

  }, [filterCapital])
  return (
    <main>
      <h1>Prueb técnica filtrar API países </h1>
      <nav>
        <select onChange={(e) => {
          const filter = e.target.value
          console.log(filter)
          setFilterCapital(filter === 'all' ? undefined : filter as Capital)
        }}>
          <option key='all' value='all'>All countries</option>
          {

            FILTERABLE_CAPITALS.map((capital) => {
              return (
                <option key={capital} value={capital}>{capital}</option>
              )
            })
          }
        </select>
      </nav>
      <ListCountries listCountries={countries} />

    </main>
  )
}

export default App
