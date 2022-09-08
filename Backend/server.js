const express = require('express')

const path = require('path')

const cors = require('cors')

const app = express()

const {createArchive, getAllArchives, deleteArchive} = require('./controller.js')

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./Client/index.html"))
})

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, "./Client/styles.css"))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, "./Client/frontEnd.js"))
})


app.post('/api/archives', createArchive)

app.get('/api/archives', getAllArchives)

app.delete('/api/archives/:id', deleteArchive)

app.listen(4077, () => console.log('Running on port 4077'))