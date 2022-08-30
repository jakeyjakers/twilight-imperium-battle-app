const express = require('express')
const app = express()
const cors = reqire('cors')

const {createArchive, getAllArchives, deleteArchive} = require('./controller.js')

app.use(express.json())
app.use(cors())

app.post('/api/archives', createArchive)

app.get('/api/archives', getAllArchives)

app.delete('/api/archives', deleteArchive)