import express from 'express'
import cors from 'cors'
import multer from 'multer'
import cvToJson from 'convert-csv-to-json'

const app = express()
const port = process.env.PORT ?? 2000

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


app.use(cors())
let userData: Array<Record<string, string>> = []
app.post('/api/files', upload.single('file'), async (req, res) => {
    //1. Extract file from reques

    const { file } = req
    //2. validate that the file is uploaded
    if (!file) {
        return res.status(500).json({ message: 'File is required' })
    }
    //3. validate the file type .csv
    if (file.mimetype !== 'text/csv') {
        return res.status(500).json({ message: 'File must be CSV' })
    }
    //4. transfor file to string
    let json: Array<Record<string, string>> = []
    try {
        const rawCsv = Buffer.from(file.buffer).toString('utf-8')
        console.log(rawCsv)
        //5. tranform csv to json
        json = cvToJson.fieldDelimiter(',').csvStringToJson(rawCsv)

    } catch (error) {
        return res.status(500).json({ mesagge: 'Error parsing the file' })
    }
    //6. Save the JSON in data base or memory
    userData = json
    console.log(userData)
    //7. return 200 with the message and the JSON
    return res.status(200).json({ data: userData, message: 'File uploaded correctly' })

})
app.get('/api/users', async (req, res) => {
    //1. extract the query param q from request
    const { q } = req.query

    //2. validate the query param 
    if (!q) {
        return res.status(500).json({ mesagge: 'Query param is required' })
    }
    if (Array.isArray(q)) {
        return res.status(500).json({ mesagge: 'Query param must be string' })
    }
    //3. filter data with the query param
    const search = q.toString().toLowerCase()


    const filterData = userData.filter((row) => {
        return Object.values(row).some(value => value.toLowerCase().includes(search))
    })

    //4. return 200 with the filter data 
    return res.status(200).json({ data: filterData })
})
app.listen(port, () => {
    console.log("calling API")
})

