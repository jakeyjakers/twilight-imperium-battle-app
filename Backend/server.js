const express = require('express')

const path = require('path')

require('dotenv').config()

const cors = require('cors')

const app = express()

const {createArchive, getAllArchives, deleteArchive} = require('./controller.js')

const {ROLLBARTOKEN} = process.env

app.use(express.json())
app.use(cors())


// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: ROLLBARTOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../Client/index.html"))
    rollbar.log("Someone is using your page")
})

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, "../Client/styles.css"))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, "../Client/frontEnd.js"))
})

// app.get('/jpeg', (req, res) => {
//     res.sendFile(path.join(__dirname, "../images/1_CiFccsrrZLCb0JHrEp7zaw.jpeg"))
// })

app.post('/api/archives', createArchive)

app.get('/api/archives', getAllArchives)

app.delete('/api/archives/:id', deleteArchive)

const port = process.env.PORT || 4077

app.listen(port, () => console.log(`Server listening on ${port}`))