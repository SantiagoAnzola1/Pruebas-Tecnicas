import React, { useState } from 'react'

import { uploadFile } from './services/uploadFile'
import { Data } from './types'
import { Toaster, toast } from 'sonner'
import './App.css'
import Search from './steps/Search'

const APP_STATUS = {
  IDLE: 'idle',
  ERROR: 'error',
  READY_UPLOAD: 'ready_upload',//al elegir archivo
  UPLOADING: 'uploading', //mientras se sube el archivo
  READY_USE: 'ready_use' //archivo subido
} as const

const BUTTON_TEXT = {
  [APP_STATUS.READY_UPLOAD]: 'Subir archivo',
  [APP_STATUS.UPLOADING]: 'Subiendo...',
}
type AppStatusType = typeof APP_STATUS[keyof typeof APP_STATUS]
function App() {

  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE)
  const [data, setData] = useState<Data>([])
  const [file, setFile] = useState<File | null>(null)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? []

    if (file) {
      setFile(file)
      setAppStatus(APP_STATUS.READY_UPLOAD)
    }
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (appStatus !== APP_STATUS.READY_UPLOAD || !file) {
      return
    }

    setAppStatus(APP_STATUS.UPLOADING)

    const [err, newData] = await uploadFile(file)
    console.log({ newData })
    if (err) {
      setAppStatus(APP_STATUS.ERROR)
      toast.error(err.message)
      return
    }

    setAppStatus(APP_STATUS.READY_USE)
    if (newData) setData(newData)
    toast.success('File uploaded successfully')

  }


  const showButton = appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING
  const showInput = appStatus !== APP_STATUS.READY_USE

  return (
    <>
      <Toaster />
      <h1>Challenge Upload CSV and Search</h1>

      {showInput &&
        (
          <form onSubmit={handleSubmit}>
            <label>
              <input disabled={appStatus === APP_STATUS.UPLOADING} onChange={handleInputChange} name='file' type="file" accept='.csv' />
            </label>
            {
              showButton &&
              (
                <button disabled={appStatus === APP_STATUS.UPLOADING} type='submit' >{BUTTON_TEXT[appStatus]}</button>
              )
            }
          </form>
        )
      }

      {
        appStatus === APP_STATUS.READY_USE &&
        (
          <Search initialData={data} />
        )
      }
    </>
  )
}

export default App
