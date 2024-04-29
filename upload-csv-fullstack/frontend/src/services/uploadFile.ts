import { type Data, ApiUploadResponse } from '../types'
import { API_HOST } from '../config'

export const uploadFile = async (file: File): Promise<[Error | undefined, Data?]> => {

  const formData = new FormData()

  formData.append('file', file)
  try {
    const res = await fetch(`${API_HOST}/api/files`, {
      method: 'POST',
      body: formData
    })

    if (!res.ok) return [new Error(`Error uploading the file ${res.statusText}`)]

    const json = await res.json() as ApiUploadResponse

    return [undefined, json.data]
  } catch (error) {
    if (error instanceof Error) return [error]
  }

  return [new Error('Unknown error')]
}
