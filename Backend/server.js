const express = require('express')

const cors = require('cors')

const app = express()

const {createArchive, getAllArchives, deleteArchive} = require('./controller.js')

app.use(express.json())
app.use(cors())

app.post('/api/archives', createArchive)

app.get('/api/archives', getAllArchives)

app.delete('/api/archives/:id', deleteArchive)

app.listen(4077, () => console.log('Running on port 4077'))