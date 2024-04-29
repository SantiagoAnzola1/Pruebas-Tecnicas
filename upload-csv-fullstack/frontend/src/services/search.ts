import { type Data, type ApiSearchResponse } from '../types'
import { API_HOST } from '../config'
export const searchData = async (search: string): Promise<[Error | undefined, Data?]> => {

    try {

        const res = await fetch(`${API_HOST}/api/users?q=${search}`)


        if (!res.ok) return [new Error(`Error searchin data: ${res.statusText}`)]

        const json = await res.json() as ApiSearchResponse
        console.log(json)
        return [undefined, json.data]
    } catch (error) {
        if (error instanceof Error) return [error]
    }

    return [new Error('Unknown error')]
}
