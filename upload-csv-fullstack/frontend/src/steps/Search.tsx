import React, { useEffect, useState } from "react"
import { Data } from "../types"
import { searchData } from "../services/search"
import { toast } from 'sonner'
import { useDebounce } from '@uidotdev/usehooks'


const DEBOUNCE_TIME = 300
function Search({ initialData }: { initialData: Data }) {
    const [data, setData] = useState<Data>(initialData)
    const [search, setSearch] = useState<string>(() => {
        const searchParams = new URLSearchParams(window.location.search)
        return searchParams.get('q') ?? ''
    })

    const debounceSearch = useDebounce(search, DEBOUNCE_TIME)

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {

        setSearch(event.target.value)
    }

    useEffect(() => {
        const newPathName = debounceSearch === ''
            ? window.location.pathname
            : `?q=${debounceSearch}`

        window.history.replaceState({}, '', newPathName)

    }, [debounceSearch])

    useEffect(() => {
        if (!debounceSearch) {
            setData(initialData)
            return
        }
        //llama api para filtar resultados
        searchData(debounceSearch)
            .then(response => {
                const [err, newData] = response
                if (err) {
                    toast.error(err.message)
                    return
                }
                if (newData) {

                    setData(newData)
                }
            })
    }, [debounceSearch, initialData])
    return (
        <div>
            <h1>Search</h1>
            <form action="">

                <input onChange={handleInput} type="text" name="search" id="" placeholder="Buscar información..." defaultValue={search} />
            </form>
            <ul>
                {data.map((row) => {
                    return (
                        <li key={row.id}>
                            <article>
                                {
                                    Object
                                        .entries(row)
                                        .map(([key, value]) => <p key={key}><strong>{key}</strong>: {value}</p>)
                                }
                            </article>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Search